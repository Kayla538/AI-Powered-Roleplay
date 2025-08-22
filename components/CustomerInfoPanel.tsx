import React from 'react';
import type { Scenario, ContactHistoryItem, Order } from '../types';

const InfoSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-700/50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-300 border-b border-gray-600 pb-2 mb-3 uppercase tracking-wider">{title}</h3>
        <div className="space-y-2 text-sm">
            {children}
        </div>
    </div>
);

const InfoItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="text-gray-400">{label}:</span>
        <span className="text-gray-200 font-medium">{value}</span>
    </div>
);

const HistoryItem: React.FC<{ item: ContactHistoryItem; onClick: () => void; }> = ({ item, onClick }) => (
    <div 
        className="py-2 border-b border-gray-700 last:border-b-0 cursor-pointer hover:bg-gray-700/70 rounded-md -mx-2 px-2 transition-colors"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick()}
    >
        <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-200">{item.reason}</p>
            <p className="text-xs text-gray-400">{item.date}</p>
        </div>
        <p className="text-gray-400 text-xs">Outcome: {item.outcome}</p>
    </div>
);

const OrderItem: React.FC<{ order: Order; onClick: () => void; }> = ({ order, onClick }) => (
     <div 
        className="grid grid-cols-2 gap-2 py-2 border-b border-gray-700 last:border-b-0 text-xs cursor-pointer hover:bg-gray-700/70 rounded-md -mx-2 px-2 transition-colors"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick()}
    >
        <p className="text-gray-400 col-span-2">{order.items} ({order.orderId})</p>
        <p className="text-gray-200">{order.date}</p>
        <p className={`text-right font-semibold ${order.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{order.status}</p>
    </div>
);


const CustomerInfoPanel: React.FC<{ scenario: Scenario; onViewDetails: (details: string) => void; }> = ({ scenario, onViewDetails }) => {
    const { customerName, customerData, contactHistory } = scenario;

    return (
        <div className="text-gray-300 font-sans p-4 space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-white">
                    {customerName}
                </h2>
                <p className="text-sm text-gray-400">{customerData.accountId}</p>
            </div>

            <InfoSection title="Contact Information">
                <InfoItem label="Email" value={customerData.email} />
                <InfoItem label="Phone" value={customerData.phone} />
            </InfoSection>

            <InfoSection title="Account Details">
                <InfoItem label="Plan" value={customerData.plan} />
                <InfoItem label="Member Since" value={customerData.joinDate} />
            </InfoSection>

            {customerData.orderHistory && customerData.orderHistory.length > 0 && (
                 <InfoSection title="Recent Orders">
                    {customerData.orderHistory.map(order => <OrderItem key={order.orderId} order={order} onClick={() => onViewDetails(order.details)} />)}
                 </InfoSection>
            )}

            <InfoSection title="Contact History">
                 {contactHistory.length > 0 ? (
                    contactHistory.map((item, index) => <HistoryItem key={index} item={item} onClick={() => onViewDetails(item.details)} />)
                ) : (
                    <p className="text-gray-500 text-sm italic">No previous contact history.</p>
                )}
            </InfoSection>

        </div>
    );
};

export default CustomerInfoPanel;