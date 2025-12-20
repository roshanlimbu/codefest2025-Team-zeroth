import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Users, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

function StatCard({ icon: Icon, label, value, className }) {
    return (
        <div className={`p-4 rounded-lg shadow-sm bg-white ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm text-gray-500">{label}</div>
                    <div className="text-2xl font-bold mt-1">{value}</div>
                </div>
                <div className="p-2 rounded bg-gray-100">
                    <Icon className="w-6 h-6 text-gray-600" />
                </div>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [tab, setTab] = useState('overview');
    const [users, setUsers] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError('');
        try {
            const [uRes, cRes] = await Promise.all([
                axiosClient.get('/admin/users'),
                axiosClient.get('/admin/campaigns'),
            ]);

            setUsers(uRes.data.users || []);
            setCampaigns(cRes.data || []);
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    const approveKYC = async (userId) => {
        try {
            await axiosClient.post('/verifyKYC', { userId });
            await loadData();
        } catch (err) {
            alert(err.response?.data?.error || err.message || 'Failed to approve');
        }
    };

    const rejectKYC = async (userId) => {
        const reason = window.prompt('Enter rejection reason (optional)');
        try {
            await axiosClient.post('/rejectKYC', { userId, reason });
            await loadData();
        } catch (err) {
            alert(err.response?.data?.error || err.message || 'Failed to reject');
        }
    };

    const updateCampaignStatus = async (campaignId, status) => {
        try {
            await axiosClient.put('/api/campaigns/admin/update-status', { id: campaignId, status });
            await loadData();
        } catch (err) {
            alert(err.response?.data?.error || err.message || 'Failed to update campaign status');
        }
    };

    const kycQueue = users.filter(u => u.kycSubmittedAt && !u.kycVerified);

    const totalUsers = users.length;
    const pendingKYC = kycQueue.length;
    const totalCampaigns = campaigns.length;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <aside className="col-span-12 lg:col-span-3">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-emerald-800 rounded flex items-center justify-center text-white font-bold">A</div>
                            <div>
                                <div className="font-semibold">Admin</div>
                                <div className="text-sm text-gray-500">We Raise It</div>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <button onClick={() => setTab('overview')} className={`w-full text-left px-3 py-2 rounded ${tab==='overview' ? 'bg-emerald-800 text-white' : 'hover:bg-gray-100'}`}>Overview</button>
                            <button onClick={() => setTab('users')} className={`w-full text-left px-3 py-2 rounded ${tab==='users' ? 'bg-emerald-800 text-white' : 'hover:bg-gray-100'}`}>Users</button>
                            <button onClick={() => setTab('kyc')} className={`w-full text-left px-3 py-2 rounded ${tab==='kyc' ? 'bg-emerald-800 text-white' : 'hover:bg-gray-100'}`}>KYC Queue <span className="ml-2 text-sm text-gray-500">({pendingKYC})</span></button>
                            <button onClick={() => setTab('campaigns')} className={`w-full text-left px-3 py-2 rounded ${tab==='campaigns' ? 'bg-emerald-800 text-white' : 'hover:bg-gray-100'}`}>Campaigns</button>
                            <button onClick={loadData} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"><RefreshCw className="w-4 h-4"/> Refresh</button>
                        </nav>
                    </div>
                </aside>

                {/* Main */}
                <main className="col-span-12 lg:col-span-9">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <StatCard icon={Users} label="Total Users" value={totalUsers} />
                        <StatCard icon={CheckCircle} label="Pending KYC" value={pendingKYC} className="" />
                        <StatCard icon={FileText} label="Total Campaigns" value={totalCampaigns} />
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        {loading && <div className="text-gray-600 mb-4">Loading...</div>}
                        {error && <div className="text-red-600 mb-4">{error}</div>}

                        {tab === 'overview' && (
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                                <p className="text-sm text-gray-600">Quick actions and recent items.</p>

                                <div className="mt-4 space-y-4">
                                    <div className="p-3 border rounded flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold">Pending KYC Reviews</div>
                                            <div className="text-sm text-gray-500">There are {pendingKYC} submissions awaiting review.</div>
                                        </div>
                                        <div>
                                            <button onClick={() => setTab('kyc')} className="px-3 py-1 bg-emerald-800 text-white rounded">Review</button>
                                        </div>
                                    </div>

                                    <div className="p-3 border rounded flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold">Campaign Moderation</div>
                                            <div className="text-sm text-gray-500">Review newly submitted campaigns and publish them live.</div>
                                        </div>
                                        <div>
                                            <button onClick={() => setTab('campaigns')} className="px-3 py-1 bg-emerald-800 text-white rounded">Moderate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {tab === 'users' && (
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Users ({users.length})</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto text-left">
                                        <thead>
                                            <tr className="text-sm text-gray-600">
                                                <th className="py-2">Name</th>
                                                <th className="py-2">Email</th>
                                                <th className="py-2">Type</th>
                                                <th className="py-2">KYC</th>
                                                <th className="py-2">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(u => (
                                                <tr key={u.id} className="border-t">
                                                    <td className="py-3">
                                                        <div className="font-medium">{u.name}</div>
                                                    </td>
                                                    <td className="py-3 text-sm text-gray-600">{u.email}</td>
                                                    <td className="py-3 text-sm">{u.type}</td>
                                                    <td className="py-3 text-sm">{u.kycVerified ? <span className="text-green-600">Verified</span> : (u.kycSubmittedAt ? <span className="text-yellow-600">Submitted</span> : <span className="text-gray-500">No</span>)}</td>
                                                    <td className="py-3 text-sm text-gray-500">{new Date(u.createdAt || Date.now()).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {tab === 'kyc' && (
                            <div>
                                <h2 className="text-lg font-semibold mb-4">KYC Queue ({kycQueue.length})</h2>
                                <div className="space-y-3">
                                    {kycQueue.length === 0 && <div className="text-gray-600">No pending KYC submissions</div>}
                                    {kycQueue.map(u => (
                                        <div key={u.id} className="p-4 border rounded flex justify-between items-start">
                                            <div>
                                                <div className="font-semibold">{u.name} — {u.email}</div>
                                                <div className="text-sm text-gray-500">Submitted: {new Date(u.kycSubmittedAt).toLocaleString()}</div>
                                                <div className="mt-2 text-sm flex gap-2">
                                                    {u.kycDocuments && Object.entries(u.kycDocuments).map(([k, v]) => (
                                                        <span key={k} className="flex items-center gap-2">
                                                            {Array.isArray(v) ? (
                                                                v.map((fileUrl, idx) => (
                                                                    <a key={idx} href={String(fileUrl)} target="_blank" rel="noreferrer" className="text-emerald-800 underline">{`${k} ${idx+1}`}</a>
                                                                ))
                                                            ) : (
                                                                <a href={String(v)} target="_blank" rel="noreferrer" className="text-emerald-800 underline">{k}</a>
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-2">
                                                <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => approveKYC(u.id)}>Approve</button>
                                                <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => rejectKYC(u.id)}>Reject</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'campaigns' && (
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Campaigns ({campaigns.length})</h2>
                                <div className="space-y-3">
                                    {campaigns.map(c => (
                                        <div key={c.id} className="p-4 border rounded flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
                                            <div>
                                                <div className="font-semibold">{c.title}</div>
                                                <div className="text-sm text-gray-500">By {c.creator?.name || c.creator?.email} — Category: {c.category}</div>
                                                <div className="text-sm text-gray-500 mt-1">Target: {c.fundTarget} — Raised: {c.fundRaised}</div>
                                            </div>
                                            <div className="flex gap-2 flex-wrap">
                                                {['DRAFT','SUBMITTED','VERIFIED','LIVE','PAUSED','COMPLETED','REJECTED'].map(s => (
                                                    <button key={s} className={`px-2 py-1 rounded ${c.status===s? 'bg-emerald-800 text-white' : 'bg-gray-100'}`} onClick={() => updateCampaignStatus(c.id, s)}>{s}</button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
