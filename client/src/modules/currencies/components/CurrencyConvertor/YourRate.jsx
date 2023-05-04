
export default function YourRate({ from, to, rate, lastUpdated }) {
    if (!rate) return null;
    return (
        <div>
            Your rate:
            {from} 1 = {to} {rate}
            Last updated {lastUpdated}
        </div>
    );
}