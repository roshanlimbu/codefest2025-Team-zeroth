import { Users, ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react"
import { useVoting } from "../../context/VotingContext"

const CommunityConsensus = () => {
  const { consensusData } = useVoting()

  if (!consensusData) return null

  const { totalVoters, votes } = consensusData
  const yesPercentage = votes.yes.percentage
  const noPercentage = votes.no.percentage

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-bold text-gray-900">Community Consensus</h2>
      </div>

      <div className="space-y-4">
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-gray-900">{totalVoters}</div>
          <div className="text-sm text-gray-600 mt-1">Total Voters</div>
        </div>

        <div className="space-y-3">
          {/* Yes Votes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Yes</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-green-600">{yesPercentage.toFixed(1)}%</span>
                <span className="text-xs text-gray-500 ml-2">({votes.yes.count} votes)</span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${yesPercentage}%` }} />
            </div>
          </div>

          {/* No Votes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <ThumbsDown className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">No</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-red-600">{noPercentage.toFixed(1)}%</span>
                <span className="text-xs text-gray-500 ml-2">({votes.no.count} votes)</span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${noPercentage}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            {yesPercentage > 50 ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Community Approved</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
                <span className="text-sm font-medium">Voting in Progress</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityConsensus