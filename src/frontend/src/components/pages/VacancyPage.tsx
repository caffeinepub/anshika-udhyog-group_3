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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Clock, DollarSign, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const VACANCIES = [
  {
    id: "v1",
    title: "Branch Manager",
    department: "Operations",
    location: "Lucknow",
    type: "Full-Time",
    salary: "\u20B918,000-25,000/month",
    experience: "2-5 years",
    qualification: "Graduate",
    description:
      "Manage day-to-day operations of the Lucknow branch, oversee member services, and lead a team of 10+ staff.",
    responsibilities: [
      "Branch operations management",
      "Member onboarding and support",
      "Revenue target achievement",
      "Staff training and management",
    ],
    posted: "2025-03-01",
  },
  {
    id: "v2",
    title: "Field Executive",
    department: "Sales & Marketing",
    location: "Multiple Cities UP",
    type: "Full-Time",
    salary: "\u20B910,000-15,000 + Incentives",
    experience: "0-2 years",
    qualification: "10th / 12th Pass",
    description:
      "Visit potential members, explain schemes, and help with registrations and KYC documentation.",
    responsibilities: [
      "Member enrollment",
      "Field visits and follow-ups",
      "Document collection",
      "Target achievement",
    ],
    posted: "2025-03-10",
  },
  {
    id: "v3",
    title: "Computer Operator",
    department: "Administration",
    location: "Head Office, Lucknow",
    type: "Full-Time",
    salary: "\u20B912,000-16,000/month",
    experience: "1-3 years",
    qualification: "Graduate with Computer Skills",
    description:
      "Handle data entry, MIS reports, member database management, and administrative tasks.",
    responsibilities: [
      "Data entry and management",
      "Report preparation",
      "Office correspondence",
      "Database management",
    ],
    posted: "2025-03-15",
  },
  {
    id: "v4",
    title: "Social Media Manager",
    department: "Marketing",
    location: "Lucknow / Remote",
    type: "Part-Time",
    salary: "\u20B98,000-12,000/month",
    experience: "1-2 years",
    qualification: "Graduate",
    description:
      "Manage social media accounts, create engaging content, and grow our digital presence.",
    responsibilities: [
      "Social media content creation",
      "Community management",
      "Analytics reporting",
      "Campaign management",
    ],
    posted: "2025-03-20",
  },
];

export function VacancyPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedJob, setSelectedJob] = useState<(typeof VACANCIES)[0] | null>(
    null,
  );
  const [applyFor, setApplyFor] = useState<(typeof VACANCIES)[0] | null>(null);
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });

  const filtered = VACANCIES.filter((v) => {
    const matchSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || v.type === filterType;
    return matchSearch && matchType;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Application submitted for ${applyFor?.title}!`);
    setApplyFor(null);
    setApplyForm({
      name: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
    });
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
          💼 Career Opportunities
        </h1>
        <p className="text-green-100 max-w-xl mx-auto">
          Build your career with ANSHIKA UDHYOG GROUP
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-ocid="vacancy.search_input"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger
              className="w-full sm:w-48"
              data-ocid="vacancy.type.select"
            >
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-Time">Full-Time</SelectItem>
              <SelectItem value="Part-Time">Part-Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4" data-ocid="vacancy.list">
          {filtered.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="vacancy.empty_state"
            >
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No vacancies found</p>
            </div>
          ) : (
            filtered.map((job, idx) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                data-ocid={`vacancy.item.${idx + 1}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-sm text-green-700">{job.department}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        job.type === "Full-Time" ? "default" : "secondary"
                      }
                    >
                      {job.type}
                    </Badge>
                    <Badge variant="outline">New</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {job.experience}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJob(job)}
                    className="border-green-300 text-green-800"
                    data-ocid={`vacancy.view.${idx + 1}`}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    style={{ backgroundColor: "#166534" }}
                    onClick={() => setApplyFor(job)}
                    data-ocid={`vacancy.apply.${idx + 1}`}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-lg" data-ocid="vacancy.details.dialog">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Location</div>
                  <div className="font-semibold">{selectedJob.location}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Type</div>
                  <div className="font-semibold">{selectedJob.type}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Salary</div>
                  <div className="font-semibold text-green-700">
                    {selectedJob.salary}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Experience</div>
                  <div className="font-semibold">{selectedJob.experience}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Responsibilities:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedJob.responsibilities.map((r) => (
                    <li key={r} className="text-sm text-gray-600">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className="w-full"
                style={{ backgroundColor: "#166534" }}
                onClick={() => {
                  setSelectedJob(null);
                  setApplyFor(selectedJob);
                }}
                data-ocid="vacancy.details.apply_button"
              >
                Apply for this Job
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Apply Dialog */}
      <Dialog open={!!applyFor} onOpenChange={() => setApplyFor(null)}>
        <DialogContent data-ocid="vacancy.apply.dialog">
          <DialogHeader>
            <DialogTitle>Apply: {applyFor?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input
                required
                value={applyForm.name}
                onChange={(e) =>
                  setApplyForm((p) => ({ ...p, name: e.target.value }))
                }
                className="mt-1"
                data-ocid="vacancy.apply.name.input"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                required
                type="email"
                value={applyForm.email}
                onChange={(e) =>
                  setApplyForm((p) => ({ ...p, email: e.target.value }))
                }
                className="mt-1"
                data-ocid="vacancy.apply.email.input"
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                required
                type="tel"
                value={applyForm.phone}
                onChange={(e) =>
                  setApplyForm((p) => ({ ...p, phone: e.target.value }))
                }
                className="mt-1"
                data-ocid="vacancy.apply.phone.input"
              />
            </div>
            <div>
              <Label>Years of Experience</Label>
              <Input
                value={applyForm.experience}
                onChange={(e) =>
                  setApplyForm((p) => ({ ...p, experience: e.target.value }))
                }
                className="mt-1"
                data-ocid="vacancy.apply.experience.input"
              />
            </div>
            <div>
              <Label>Cover Letter</Label>
              <Textarea
                value={applyForm.coverLetter}
                onChange={(e) =>
                  setApplyForm((p) => ({ ...p, coverLetter: e.target.value }))
                }
                className="mt-1"
                placeholder="Why are you suitable for this role?"
                data-ocid="vacancy.apply.cover_letter.textarea"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: "#166534" }}
              data-ocid="vacancy.apply.submit_button"
            >
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
