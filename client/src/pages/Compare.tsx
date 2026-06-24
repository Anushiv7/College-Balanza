import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import { Loader2, Moon, Plus, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

interface SelectedCollege {
  id?: number;
  name: string;
  placements?: string;
  location?: string;
  facultyReview?: string;
  fees?: string;
  roi?: string;
  industryValue?: string;
  brandValue?: string;
  collegeLife?: string;
}

const COMPARISON_FIELDS = [
  { key: 'placements', label: 'Placements' },
  { key: 'location', label: 'Location' },
  { key: 'facultyReview', label: 'Faculty Review' },
  { key: 'fees', label: 'Fees' },
  { key: 'roi', label: 'ROI' },
  { key: 'industryValue', label: 'Industry Value' },
  { key: 'brandValue', label: 'Brand Value' },
  { key: 'collegeLife', label: 'College Life' },
];

export default function Compare() {
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [, navigate] = useLocation();
  
  const [selectedColleges, setSelectedColleges] = useState<SelectedCollege[]>([]);
  const [searchInputs, setSearchInputs] = useState<string[]>(['', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string>('');
  const [expandedField, setExpandedField] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleAddCollege = () => {
    setSearchInputs([...searchInputs, '']);
  };

  const handleRemoveCollege = (index: number) => {
    const newInputs = searchInputs.filter((_, i) => i !== index);
    const newSelected = selectedColleges.filter((_, i) => i !== index);
    setSearchInputs(newInputs);
    setSelectedColleges(newSelected);
  };

  const handleSearchInputChange = (index: number, value: string) => {
    const newInputs = [...searchInputs];
    newInputs[index] = value;
    setSearchInputs(newInputs);
  };

  const handleSelectCollege = async (index: number, collegeName: string) => {
    if (!collegeName.trim()) return;

    setIsLoading(true);
    try {
      // In a real app, this would call an API to fetch college data
      // For now, we'll create a mock college object
      const mockCollege: SelectedCollege = {
        name: collegeName,
        placements: 'Data fetching from web sources...',
        location: 'Fetching...',
        facultyReview: 'Fetching...',
        fees: 'Fetching...',
        roi: 'Fetching...',
        industryValue: 'Fetching...',
        brandValue: 'Fetching...',
        collegeLife: 'Fetching...',
      };

      const newSelected = [...selectedColleges];
      newSelected[index] = mockCollege;
      setSelectedColleges(newSelected);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompare = async () => {
    if (selectedColleges.length < 2) {
      alert('Please select at least 2 colleges to compare');
      return;
    }

    setIsLoading(true);
    try {
      // This would call an LLM API to generate comparison summary
      setSummary('Generating AI-powered comparison summary...');
      // Mock summary for now
      setTimeout(() => {
        setSummary(
          `Based on our analysis of ${selectedColleges.map(c => c.name).join(', ')}, ` +
          `we found that these institutions offer distinct advantages. ` +
          `Consider your priorities: if placements are crucial, ${selectedColleges[0]?.name} excels. ` +
          `For campus life and overall experience, ${selectedColleges[selectedColleges.length - 1]?.name} stands out.`
        );
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/50 border-b border-accent/30">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            College Balanza
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            {isAuthenticated && (
              <div className="text-sm text-muted-foreground">
                {user?.name}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-12">
        <div className="container">
          {/* Selection Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-8 text-white">
              Compare Colleges
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {searchInputs.map((input, index) => (
                <div key={index} className="relative">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder={`Enter college name ${index + 1}`}
                        value={input}
                        onChange={(e) => handleSearchInputChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSelectCollege(index, input);
                          }
                        }}
                        className="bg-card/50 border-accent/30 text-white placeholder-white/50"
                      />
                    </div>
                    {searchInputs.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCollege(index)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {selectedColleges[index] && (
                    <div className="mt-2 p-2 bg-accent/10 rounded border border-accent/30">
                      <p className="text-sm text-accent font-semibold">
                        ✓ {selectedColleges[index]?.name}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddCollege}
                variant="outline"
                className="border-accent/50 text-accent hover:bg-accent/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add College
              </Button>
              <Button
                onClick={handleCompare}
                disabled={selectedColleges.length < 2 || isLoading}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Comparing...
                  </>
                ) : (
                  'Compare Now'
                )}
              </Button>
            </div>
          </div>

          {/* Comparison Table */}
          {selectedColleges.length >= 2 && (
            <div className="space-y-8">
              {/* AI Summary */}
              {summary && (
                <div className="bg-card/50 border border-accent/30 rounded-lg p-6 backdrop-blur">
                  <h2 className="text-xl font-bold mb-4 text-white">
                    AI-Powered Comparison Summary
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {summary}
                  </p>
                </div>
              )}

              {/* Comparison Table */}
              <div className="bg-card/50 border border-accent/30 rounded-lg overflow-hidden backdrop-blur">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-accent/30 bg-accent/10">
                        <th className="px-6 py-4 text-left font-semibold text-white">
                          Metric
                        </th>
                        {selectedColleges.map((college, idx) => (
                          <th key={idx} className="px-6 py-4 text-left font-semibold text-white">
                            {college.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_FIELDS.map((field) => (
                        <tr
                          key={field.key}
                          className="border-b border-accent/20 hover:bg-accent/5 transition-colors cursor-pointer"
                          onClick={() => setExpandedField(expandedField === field.key ? null : field.key)}
                        >
                          <td className="px-6 py-4 font-semibold text-white">
                            {field.label}
                          </td>
                          {selectedColleges.map((college, idx) => (
                            <td key={idx} className="px-6 py-4 text-muted-foreground">
                              <div className="line-clamp-2">
                                {college[field.key as keyof SelectedCollege] || 'N/A'}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Accordion Details */}
              <div className="space-y-4">
                {COMPARISON_FIELDS.map((field) => (
                  <div
                    key={field.key}
                    className="bg-card/50 border border-accent/30 rounded-lg overflow-hidden backdrop-blur"
                  >
                    <button
                      onClick={() => setExpandedField(expandedField === field.key ? null : field.key)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
                    >
                      <h3 className="font-semibold text-white">{field.label}</h3>
                      <div
                        className={`transform transition-transform ${
                          expandedField === field.key ? 'rotate-180' : ''
                        }`}
                      >
                        ▼
                      </div>
                    </button>
                    {expandedField === field.key && (
                      <div className="px-6 py-4 border-t border-accent/30 space-y-4">
                        {selectedColleges.map((college, idx) => (
                          <div key={idx}>
                            <p className="text-sm font-semibold text-accent mb-2">
                              {college.name}
                            </p>
                            <p className="text-muted-foreground">
                              {college[field.key as keyof SelectedCollege] || 'No data available'}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {selectedColleges.length < 2 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Select at least 2 colleges to start comparing
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
