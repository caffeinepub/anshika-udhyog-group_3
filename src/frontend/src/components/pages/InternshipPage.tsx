import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Clock, MapPin, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const INTERNSHIPS = [
  {
    id: "int1",
    title: "Digital Marketing Intern",
    department: "Marketing",
    duration: "3 Months",
    stipend: "\u20B95,000/month",
    location: "Lucknow / Remote",
    skills: ["Social Media", "Content Writing", "Canva"],
    description:
      "Learn digital marketing, social media management, content creation, and online advertising strategies.",
    openings: 3,
  },
  {
    id: "int2",
    title: "Web Development Intern",
    department: "Technology",
    duration: "6 Months",
    stipend: "\u20B98,000/month",
    location: "Lucknow",
    skills: ["HTML/CSS", "JavaScript", "React"],
    description:
      "Work on real-world web projects, build features, and learn modern web development practices.",
    openings: 2,
  },
  {
    id: "int3",
    title: "Field Coordinator Intern",
    department: "NGO Operations",
    duration: "3 Months",
    stipend: "\u20B94,000/month",
    location: "Various UP Districts",
    skills: ["Communication", "Data Entry", "Team Work"],
    description:
      "Assist in field operations, community outreach, and data collection for NGO programs.",
    openings: 5,
  },
  {
    id: "int4",
    title: "Finance & Accounts Intern",
    department: "Finance",
    duration: "3 Months",
    stipend: "\u20B96,000/month",
    location: "Lucknow",
    skills: ["Tally", "Excel", "Accounting"],
    description:
      "Learn practical accounting, GST filing, and financial reporting in a real organizational setting.",
    openings: 2,
  },
];

export function InternshipPage() {
  const [selectedInternship, setSelectedInternship] = useState<
    (typeof INTERNSHIPS)[0] | null
  >(null);
  const [applyFor, setApplyFor] = useState<(typeof INTERNSHIPS)[0] | null>(
    null,
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    resumeFile: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      `Application submitted for ${applyFor?.title}! We will contact you soon.`,
    );
    setApplyFor(null);
    setForm({ name: "", email: "", phone: "", message: "", resumeFile: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div
        className="py-10 md:py-16 text-white text-center px-4"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          🎓 Internship Programs
        </h1>
        <p className="text-green-100 max-w-xl mx-auto">
          Gain real experience and kickstart your career with AUG
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          data-ocid="internship.list"
        >
          {INTERNSHIPS.map((intern, idx) => (
            <div
              key={intern.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              data-ocid={`internship.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {intern.title}
                  </h3>
                  <p className="text-sm text-green-700">{intern.department}</p>
                </div>
                <Badge style={{ backgroundColor: "#166534" }}>
                  {intern.openings} Openings
                </Badge>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {intern.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {intern.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> {intern.stipend}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {intern.skills.map((s) => (
                  <span
                    key={s}
                    className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {intern.description}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedInternship(intern)}
                  className="flex-1 border-green-300 text-green-800"
                  data-ocid={`internship.view.${idx + 1}`}
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  onClick={() => setApplyFor(intern)}
                  style={{ backgroundColor: "#166534" }}
                  className="flex-1"
                  data-ocid={`internship.apply.${idx + 1}`}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog
        open={!!selectedInternship}
        onOpenChange={() => setSelectedInternship(null)}
      >
        <DialogContent data-ocid="internship.details.dialog">
          <DialogHeader>
            <DialogTitle>{selectedInternship?.title}</DialogTitle>
          </DialogHeader>
          {selectedInternship && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Duration</div>
                  <div className="font-semibold">
                    {selectedInternship.duration}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Stipend</div>
                  <div className="font-semibold text-green-700">
                    {selectedInternship.stipend}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Location</div>
                  <div className="font-semibold">
                    {selectedInternship.location}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Openings</div>
                  <div className="font-semibold">
                    {selectedInternship.openings}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{selectedInternship.description}</p>
              <Button
                className="w-full"
                style={{ backgroundColor: "#166534" }}
                onClick={() => {
                  setSelectedInternship(null);
                  setApplyFor(selectedInternship);
                }}
                data-ocid="internship.details.apply_button"
              >
                Apply for this Internship
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Apply Dialog */}
      <Dialog open={!!applyFor} onOpenChange={() => setApplyFor(null)}>
        <DialogContent data-ocid="internship.apply.dialog">
          <DialogHeader>
            <DialogTitle>Apply: {applyFor?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="mt-1"
                data-ocid="internship.apply.name.input"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className="mt-1"
                data-ocid="internship.apply.email.input"
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                required
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                className="mt-1"
                data-ocid="internship.apply.phone.input"
              />
            </div>
            <div>
              <Label>Upload Resume</Label>
              <label className="flex items-center gap-2 mt-1 cursor-pointer border border-dashed border-gray-300 rounded-lg p-3 hover:border-green-400">
                <Upload className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {form.resumeFile || "Click to upload PDF/DOC"}
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  data-ocid="internship.apply.resume.upload_button"
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      resumeFile: e.target.files?.[0]?.name || "",
                    }))
                  }
                />
              </label>
            </div>
            <div>
              <Label>Why do you want this internship?</Label>
              <Textarea
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                className="mt-1"
                data-ocid="internship.apply.message.textarea"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: "#166534" }}
              data-ocid="internship.apply.submit_button"
            >
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
