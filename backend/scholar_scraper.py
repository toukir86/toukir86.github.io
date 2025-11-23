#!/usr/bin/env python3
"""
Google Scholar Scraper
Fetches publication data and metrics using the scholarly library

Requirements:
    pip install scholarly selenium beautifulsoup4
"""

import json
import sys
from datetime import datetime
from typing import Dict, List, Optional

try:
    from scholarly import scholarly
except ImportError:
    print(json.dumps({
        "success": False,
        "message": "scholarly library not installed. Install with: pip install scholarly",
        "publications": [],
        "metrics": {
            "hIndex": 0,
            "totalCitations": 0,
            "i10Index": 0,
            "publicationCount": 0
        }
    }))
    sys.exit(0)


class GoogleScholarScraper:
    """Scrape Google Scholar for publications and metrics"""

    def __init__(self, scholar_id: str):
        """
        Initialize scraper with Scholar ID

        Args:
            scholar_id: Google Scholar ID (from profile URL)
        """
        self.scholar_id = scholar_id
        self.author = None
        self.publications = []
        self.metrics = {
            "hIndex": 0,
            "totalCitations": 0,
            "i10Index": 0,
            "publicationCount": 0
        }

    def fetch_author(self) -> bool:
        """Fetch author profile from Google Scholar"""
        try:
            # Get author by ID
            self.author = scholarly.search_author_id(self.scholar_id)
            scholarly.fill(self.author, sections=['basics', 'indices', 'counts', 'publications'])
            return True
        except Exception as e:
            print(f"Error fetching author: {e}", file=sys.stderr)
            return False

    def extract_metrics(self) -> Dict:
        """Extract citation metrics from author profile"""
        if not self.author:
            return self.metrics

        try:
            self.metrics = {
                "hIndex": self.author.get('h_index', 0) or 0,
                "totalCitations": self.author.get('citedby', 0) or 0,
                "i10Index": self.author.get('i10index', 0) or 0,
                "publicationCount": len(self.author.get('publications', []))
            }
        except Exception as e:
            print(f"Error extracting metrics: {e}", file=sys.stderr)

        return self.metrics

    def extract_publications(self) -> List[Dict]:
        """Extract publications from author profile"""
        if not self.author or 'publications' not in self.author:
            return []

        publications = []

        try:
            for pub in self.author['publications']:
                # Fill in more details for each publication
                try:
                    scholarly.fill(pub)
                except:
                    pass

                publication_data = {
                    "title": pub.get('bib', {}).get('title', 'Untitled'),
                    "authors": pub.get('bib', {}).get('author', 'Unknown'),
                    "journal": pub.get('bib', {}).get('journal', 'Unknown Journal'),
                    "year": int(pub.get('bib', {}).get('pub_year', 0)) if pub.get('bib', {}).get('pub_year') else 0,
                    "citations": pub.get('num_citations', 0) or 0,
                    "doi": pub.get('bib', {}).get('ENTRYTYPE', ''),
                    "url": pub.get('pub_url', ''),
                    "authorship": self._determine_authorship(pub.get('bib', {}).get('author', '')),
                    "abstract": pub.get('bib', {}).get('abstract', '')
                }

                publications.append(publication_data)

        except Exception as e:
            print(f"Error extracting publications: {e}", file=sys.stderr)

        return publications

    @staticmethod
    def _determine_authorship(authors_str: str) -> str:
        """Determine author's role in publication"""
        if not authors_str:
            return 'other'

        authors = [a.strip() for a in authors_str.split(' and ')]
        
        if len(authors) > 0:
            # Simplified: assume first author is "first-author"
            # In production, you'd check the actual name
            if len(authors) == 1:
                return 'first-author'
            elif len(authors) <= 3:
                return 'co-author'
            else:
                return 'co-author'

        return 'other'

    def scrape(self) -> Dict:
        """Run complete scraping process"""
        try:
            if not self.fetch_author():
                raise Exception("Failed to fetch author")

            self.extract_metrics()
            self.publications = self.extract_publications()

            return {
                "success": True,
                "publications": self.publications,
                "metrics": self.metrics,
                "timestamp": datetime.now().isoformat()
            }

        except Exception as e:
            print(f"Scraping error: {e}", file=sys.stderr)
            return {
                "success": False,
                "message": str(e),
                "publications": [],
                "metrics": self.metrics
            }


def main():
    """Main entry point"""
    if len(sys.argv) < 2:
        result = {
            "success": False,
            "message": "Scholar ID not provided",
            "publications": [],
            "metrics": {
                "hIndex": 0,
                "totalCitations": 0,
                "i10Index": 0,
                "publicationCount": 0
            }
        }
    else:
        scholar_id = sys.argv[1]
        scraper = GoogleScholarScraper(scholar_id)
        result = scraper.scrape()

    # Output as JSON to stdout
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
