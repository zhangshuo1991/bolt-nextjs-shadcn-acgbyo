"use client";

import { useSearchContext } from '@/context/SearchContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SearchResults() {
  const { searchResults, pagination, setCurrentPage, isLoading } = useSearchContext();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="mt-4 space-y-4">
      {searchResults.map((vuln) => (
        <Card key={vuln.id}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{vuln.source}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium">Language:</span> {vuln.language}
            </p>
            <p className="text-sm">
              <span className="font-medium">AI Summary:</span> {vuln.aiSummary}
            </p>
          </CardContent>
        </Card>
      ))}
      {searchResults.length === 0 && (
        <p className="text-center text-muted-foreground">No vulnerabilities found</p>
      )}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </Button>
          <span className="self-center">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}