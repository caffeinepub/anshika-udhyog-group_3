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
import { Briefcase, Clock, DollarSign, MapPin, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const JOBS = [
  {
    id: "j1",
    title: "Area Sales Manager",
    company: "ANSHIKA UDHYOG GROUP",
    location: "Lucknow, UP",
    type: "Full-Time",
    salary: "\u20B925,000-40,000",
    experience: "3-5 years",
    skills: ["Sales", "Leadership", "CRM"],
    description:
      "Lead a team of 20+ field executives, manage area sales targets, and expand the network in assigned territory.",
    posted: "2025-03-25",
    urgent: true,
  },
  {
    id: "j2",
    title: "Customer Relations Officer",
    company: "ANSHIKA UDHYOG GROUP",
    location: "Varanasi, UP",
    type: "Full-Time",
    salary: "\u20B915,000-20,000",
    experience: "1-2 years",
    skills: ["Communication", "Customer Service", "CRM"],
    description:
      "Handle member queries, resolve complaints, and ensure excellent service delivery to all members.",
    posted: "2025-03-28",
    urgent: false,
  },
  {
    id: "j3",
    title: "Accounts Assistant",
    company: "ANSHIKA UDHYOG GROUP",
    location: "Agra, UP",
    type: "Full-Time",
    salary: "\u20B912,000-16,000",
    experience: "1-3 years",
    skills: ["Tally", "Excel", "GST"],
    description:
      "Assist in day-to-day accounting, payment processing, GST filing, and financial record maintenance.",
    posted: "2025-04-01",
    urgent: false,
  },
  {
    id: "j4",
    title: "Graphic Designer",
    company: "ANSHIKA UDHYOG GROUP",
    location: "Remote",
    type: "Part-Time",
    salary: "\u20B910,000-15,000",
    experience: "1-2 years",
    skills: ["Canva", "Photoshop", "Social Media"],
    description:
      "Create marketing materials, social media graphics, banners, and promotional content for the organization.",
    posted: "2025-04-03",
    urgent: true,
  },
];

export function JobsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedJob, setSelectedJob] = useState<(typeof JOBS)[0] | null>(null);
  const [applyFor, setApplyFor] = useState<(typeof JOBS)[0] | null>(null);
  const [showJobOffer, setShowJobOffer] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });

  // Show job offer popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowJobOffer(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = JOBS.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || j.type === filterType;
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
      {/* Job Offer Popup */}
      {showJobOffer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          data-ocid="jobs.offer.modal"
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowJobOffer(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              data-ocid="jobs.offer.close_button"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                We're Hiring!
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                ANSHIKA UDHYOG GROUP is expanding across UP
              </p>
              <p className="text-green-700 font-semibold mb-4">
                15+ Urgent Openings Available
              </p>
              <div className="bg-green-50 rounded-xl p-4 mb-4 text-left">
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Attractive Salary + Incentives</li>
                  <li>✅ Career Growth Opportunities</li>
                  <li>✅ Training Provided</li>
                  <li>✅ Work from Home Options</li>
                </ul>
              </div>
              <Button
                className="w-full"
                style={{ backgroundColor: "#166534" }}
                onClick={() => {
                  setShowJobOffer(false);
                  setApplyFor(JOBS[0]);
                }}
                data-ocid="jobs.offer.apply_button"
              >
                Apply Now
              </Button>
              <button
                type="button"
                className="mt-3 text-xs text-gray-400 hover:underline"
                onClick={() => setShowJobOffer(false)}
                data-ocid="jobs.offer.cancel_button"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="py-10 md:py-16 text-white text-center px-4"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          💼 Job Opportunities
        </h1>
        <p className="text-green-100">
          Find your perfect career at ANSHIKA UDHYOG GROUP
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
              data-ocid="jobs.search_input"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger
              className="w-full sm:w-40"
              data-ocid="jobs.type.select"
            >
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-Time">Full-Time</SelectItem>
              <SelectItem value="Part-Time">Part-Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4" data-ocid="jobs.list">
          {filtered.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="jobs.empty_state"
            >
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No jobs found</p>
            </div>
          ) : (
            filtered.map((job, idx) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                data-ocid={`jobs.item.${idx + 1}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {job.title}
                      </h3>
                      {job.urgent && (
                        <Badge className="bg-red-500 text-white text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-green-700">{job.company}</p>
                  </div>
                  <Badge
                    variant={job.type === "Full-Time" ? "default" : "secondary"}
                  >
                    {job.type}
                  </Badge>
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
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJob(job)}
                    className="border-green-300 text-green-800"
                    data-ocid={`jobs.view.${idx + 1}`}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    style={{ backgroundColor: "#166534" }}
                    onClick={() => setApplyFor(job)}
                    data-ocid={`jobs.apply.${idx + 1}`}
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
        <DialogContent data-ocid="jobs.details.dialog">
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
                  <div className="text-gray-500">Salary</div>
                  <div className="font-semibold text-green-700">
                    {selectedJob.salary}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Experience</div>
                  <div className="font-semibold">{selectedJob.experience}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-gray-500">Type</div>
                  <div className="font-semibold">{selectedJob.type}</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{selectedJob.description}</p>
              <Button
                className="w-full"
                style={{ backgroundColor: "#166534" }}
                onClick={() => {
                  setSelectedJob(null);
                  setApplyFor(selectedJob);
                }}
                data-ocid="jobs.details.apply_button"
              >
                Apply Now
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Apply Dialog */}
      <Dialog open={!!applyFor} onOpenChange={() => setApplyFor(null)}>
        <DialogContent data-ocid="jobs.apply.dialog">
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
                data-ocid="jobs.apply.name.input"
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
                data-ocid="jobs.apply.email.input"
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
                data-ocid="jobs.apply.phone.input"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                value={applyForm.experience}
                onChange={(e) =>
                  setApplyForm((p) => ({ ...p, experience: e.target.value }))
                }
                placeholder="e.g. 2 years"
                className="mt-1"
                data-ocid="jobs.apply.experience.input"
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
                data-ocid="jobs.apply.cover_letter.textarea"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              style={{ backgroundColor: "#166534" }}
              data-ocid="jobs.apply.submit_button"
            >
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
