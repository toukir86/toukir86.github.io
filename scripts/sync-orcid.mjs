import fs from 'node:fs/promises';
import vm from 'node:vm';

const orcid = '0000-0001-5111-7055';
const path = 'js/main.js';
const source = await fs.readFile(path, 'utf8');
const start = source.indexOf('const publicationData = [');
const end = source.indexOf("let currentFilter = 'all';", start);
if (start < 0 || end < 0) throw new Error('Publication data markers missing; no files changed.');
const publications = vm.runInNewContext(source.slice(start, end) + '\npublicationData', {}, { timeout: 1000 });
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const doiKey = value => String(value || '').replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim().toLowerCase();
const titleKey = value => String(value || '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
const safeUrl = value => { try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
const clientId = process.env.ORCID_CLIENT_ID;
const secret = process.env.ORCID_CLIENT_SECRET;
if (!clientId || !secret) throw new Error('Set ORCID_CLIENT_ID and ORCID_CLIENT_SECRET in GitHub Actions secrets.');
const tokenResponse = await fetch('https://orcid.org/oauth/token', {
  method: 'POST', headers: { Accept: 'application/json' },
  body: new URLSearchParams({ client_id: clientId, client_secret: secret, grant_type: 'client_credentials', scope: '/read-public' }),
  signal: AbortSignal.timeout(30000)
});
if (!tokenResponse.ok) throw new Error(`ORCID authentication failed (${tokenResponse.status}); no files changed.`);
const { access_token: token } = await tokenResponse.json();
if (!token) throw new Error('ORCID returned no access token.');
async function read(endpoint) {
  const response = await fetch(`https://pub.orcid.org/v3.0/${orcid}/${endpoint}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`ORCID request failed (${response.status}); no files changed.`);
  return response.json();
}
const result = await read('works');
if (!Array.isArray(result.group)) throw new Error('Unexpected ORCID response; no files changed.');
const dois = new Set(publications.map(p => doiKey(p.doi)).filter(Boolean));
const titles = new Set(publications.map(p => titleKey(p.title)));
let added = 0;
for (const group of result.group) {
  const summary = group['work-summary']?.[0];
  if (!summary) continue;
  const title = summary.title?.title?.value?.trim();
  if (!title) continue;
  const ids = summary['external-ids']?.['external-id'] || [];
  const doi = doiKey(ids.find(id => id['external-id-type']?.toLowerCase() === 'doi' && id['external-id-relationship'] === 'self')?.['external-id-value']);
  if ((doi && dois.has(doi)) || titles.has(titleKey(title))) continue;
  const work = await read(`work/${summary['put-code']}`);
  const contributors = work.contributors?.contributor || [];
  const authors = contributors.map(c => c['credit-name']?.value).filter(Boolean).join(', ');
  const url = doi ? `https://doi.org/${doi}` : safeUrl(work.url?.value) || `https://orcid.org/${orcid}`;
  publications.push({
    title: escape(title), authors: escape(authors || 'Author information available through ORCID'),
    authorship: 'unclassified', journal: escape(work['journal-title']?.value || ''),
    year: Number(work['publication-date']?.year?.value) || '', doi: escape(doi), url: escape(url)
  });
  if (doi) dois.add(doi);
  titles.add(titleKey(title));
  added++;
}
if (added) {
  publications.sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
  const replacement = 'const publicationData = ' + JSON.stringify(publications, null, 4) + ';\n\n';
  const updated = source.slice(0, start) + replacement + source.slice(end);
  new vm.Script(updated);
  await fs.writeFile(path, updated, 'utf8');
}
console.log(`Added ${added} new ORCID works; ${publications.length} total. Existing entries preserved.`);
