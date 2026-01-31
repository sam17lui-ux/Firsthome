import { useState } from "react";
import { Upload, FileText, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface DocumentUploadScreenProps {
  onBack: () => void;
}

export function DocumentUploadScreen({ onBack }: DocumentUploadScreenProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsUploaded(false);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsUploaded(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header with safe area */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-200" />
          </button>
          <h2 className="text-xl text-white">Upload Document</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 pb-12 space-y-6">
        {/* Upload Area */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-dashed border-slate-600 hover:border-blue-500/50 transition-colors">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl text-white">
                Upload your contract PDF
              </h3>
              <p className="text-sm text-gray-400">
                Drag and drop your file here, or tap to browse
              </p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer border-2 border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 rounded-xl"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose File
              </Button>
            </label>
          </div>

          {/* Selected File Display */}
          {selectedFile && (
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-200 flex-1">{selectedFile.name}</span>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50 space-y-3">
          <label htmlFor="notes" className="text-base text-white block">
            Add notes or questions
          </label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., What does 'subject to contract' mean? When is my deposit due?"
            className="min-h-[120px] resize-none bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500 rounded-2xl"
          />
          <p className="text-xs text-gray-500">
            Any questions? We'll help clarify them for you
          </p>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Upload Document
        </Button>

        {/* Confirmation Message */}
        {isUploaded && (
          <div className="bg-green-500/10 border-2 border-green-500/30 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-base text-green-300">
                Document uploaded successfully!
              </p>
              <p className="text-sm text-green-400/80">
                We're processing your document now...
              </p>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-white">
              We'll summarise key terms and deadlines for you
            </p>
          </div>
          <p className="text-sm text-gray-400">
            Our AI will highlight important clauses, completion dates, and any conditions in plain English — no legal jargon.
          </p>
        </div>
      </div>
    </div>
  );
}
