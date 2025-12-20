import { CheckCircle2 } from "lucide-react"
import BeforeAfterSection from "../components/donor-voting/BeforeAfterSection"
import SupportingReceipts from "../components/donor-voting/SupportingReceipts"
import VotingSection from "../components/donor-voting/VotingSection"
import CommunityConsensus from "../components/donor-voting/CommunityConsensus"
import { VotingProvider, useVoting } from "../context/VotingContext"

function VotingPageContent() {
  const { votingData, showSuccess, handleVote } = useVoting()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vote on Milestone Completion</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <BeforeAfterSection beforeImage={votingData.beforeAfter.before} afterImage={votingData.beforeAfter.after} />

            <SupportingReceipts receipts={votingData.receipts} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <VotingSection />

            <CommunityConsensus />

            {/* Milestone Unlocked */}
            {votingData.milestoneUnlocked.isUnlocked && (
              <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Milestone Unlocked!</h3>
                <p className="text-gray-600 leading-relaxed">{votingData.milestoneUnlocked.message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Your vote has been recorded successfully!</span>
          </div>
        )}
      </main>
    </div>
  )
}

const VotingPage = () => {
  return (
    <VotingProvider>
      <VotingPageContent />
    </VotingProvider>
  )
}

export default VotingPage
