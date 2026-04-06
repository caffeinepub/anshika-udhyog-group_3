import { Badge } from "@/components/ui/badge";
import type { LocalMember, SiteSettings } from "../../types";

interface MembershipCardProps {
  member: LocalMember;
  settings: SiteSettings;
}

const tierColors: Record<string, string> = {
  basic: "from-gray-500 to-gray-700",
  silver: "from-gray-400 to-gray-600",
  gold: "from-yellow-500 to-yellow-700",
  platinum: "from-purple-500 to-purple-700",
};

const tierBenefits: Record<string, string[]> = {
  basic: [
    "Access to basic employment schemes",
    "Monthly newsletter",
    "Digital membership card",
  ],
  silver: [
    "All Basic benefits",
    "Priority internship access",
    "Training programs access",
  ],
  gold: [
    "All Silver benefits",
    "Business mentorship",
    "Government scheme assistance",
    "Networking events",
  ],
  platinum: [
    "All Gold benefits",
    "Priority support",
    "Direct employment placement",
    "Investment guidance",
  ],
};

export function MembershipCard({ member, settings }: MembershipCardProps) {
  const colorClass = tierColors[member.membershipType] || tierColors.basic;
  const benefits = tierBenefits[member.membershipType] || tierBenefits.basic;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">My Membership</h2>
      <div
        className={`bg-gradient-to-r ${colorClass} rounded-2xl p-6 text-white shadow-lg`}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-white/70 text-sm">{settings.siteName}</div>
            <div className="text-xl font-bold mt-1 capitalize">
              {member.membershipType} Membership
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            {member.status.toUpperCase()}
          </Badge>
        </div>
        <div className="mt-6">
          <div className="text-white/70 text-xs uppercase tracking-wider">
            Member Name
          </div>
          <div className="font-bold text-lg">{member.name}</div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <div className="text-white/70 text-xs uppercase tracking-wider">
              Member ID
            </div>
            <div className="font-mono font-semibold">{member.id}</div>
          </div>
          <div>
            <div className="text-white/70 text-xs uppercase tracking-wider">
              Join Date
            </div>
            <div className="font-semibold">
              {new Date(member.joinDate).toLocaleDateString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-green-100 shadow-xs">
        <h3 className="font-semibold text-gray-900 mb-4">
          Membership Benefits
        </h3>
        <ul className="space-y-2">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
