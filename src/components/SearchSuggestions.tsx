
import React from 'react';
import { Button } from '@/components/ui/button';

interface SearchSuggestionsProps {
  suggestions: string[];
  isLoading: boolean;
  onSelectSuggestion: (suggestion: string) => void;
}

const SearchSuggestions = ({
  suggestions,
  isLoading,
  onSelectSuggestion
}: SearchSuggestionsProps) => {
  if (isLoading) {
    return (
      <div className="p-2 text-sm text-muted-foreground">
        Loading suggestions...
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="p-2 space-y-2">
      <p className="text-xs text-muted-foreground mb-1">AI Suggestions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onSelectSuggestion(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
