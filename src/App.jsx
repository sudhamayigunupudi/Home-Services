
import { useState } from "react";
import "./App.css";

const services = [
  { name: "Plumbing", icon: "🔧" },
  { name: "Electrical", icon: "💡" },
  { name: "AC Repair", icon: "❄️" },
  { name: "Cleaning", icon: "🧹" },
  { name: "Appliance Repair", icon: "🔌" },
  { name: "Carpentry", icon: "🪚" },
];

export default function App() {
  const [page, setPage] = useState("role");
  const [requests, setRequests] = useState([]);
  const [category, setCategory] = useState("Plumbing");
  const [location, setLocation] = useState("");
  const [problem, setProblem] = useState("");
  const [proCategory, setProCategory] = useState("Plumbing");
  const [proLocation, setProLocation] = useState("");
  const [proName, setProName] = useState("LocalPro Professional");

  function createRequest(e) {
    e.preventDefault();

    setRequests((old) => [
      {
        id: Date.now(),
        category,
        location: location.trim(),
        problem,
        status: "Pending",
        professional: "",
      },
      ...old,
    ]);

    setProblem("");
    alert("Your service request has been sent!");
  }

  function updateRequest(id, status) {
    setRequests((old) =>
      old.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              professional:
                status === "Accepted" ? proName : "",
            }
          : r
      )
    );
  }

  const matching = requests.filter(
    (r) =>
      r.status === "Pending" &&
      r.category === proCategory &&
      r.location.toLowerCase() === proLocation.trim().toLowerCase()
  );

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <span className="brand-icon">⌂</span>
          <span>Local<span className="blue">Pro</span></span>
        </div>
        <span className="tagline">Home services, made simple.</span>
        {page !== "role" && (
          <button className="nav-button" onClick={() => setPage("role")}>
            Switch role
          </button>
        )}
      </header>

      {page === "role" && (
        <main>
          <section className="hero">
            <span className="eyebrow">YOUR HOME. OUR EXPERTS.</span>
            <h1>Home problems?<br /><span className="blue">We've got you.</span></h1>
            <p>
              Find trusted local professionals for repairs,
              cleaning and everyday home services.
            </p>
          </section>

          <h2 className="section-title">How would you like to continue?</h2>

          <div className="role-grid">
            <button className="role-card" onClick={() => setPage("customer")}>
              <div className="role-icon customer-icon">🏠</div>
              <h3>I'm a Customer</h3>
              <p>Find an expert and request a service for your home.</p>
              <span className="card-link">Book a service →</span>
            </button>

            <button
              className="role-card"
              onClick={() => setPage("professional")}
            >
              <div className="role-icon pro-icon">🧰</div>
              <h3>I'm a Professional</h3>
              <p>Find service requests that match your skills and area.</p>
              <span className="card-link">Manage requests →</span>
            </button>
          </div>

          <div className="trust-row">
            <span>✓ Local professionals</span>
            <span>✓ Simple booking</span>
            <span>✓ Track your request</span>
          </div>
        </main>
      )}

      {page === "customer" && (
        <main className="dashboard">
          <span className="eyebrow">CUSTOMER DASHBOARD</span>
          <h1>What needs fixing?</h1>
          <p className="muted">Tell us what you need. We'll help you find the right professional.</p>

          <form className="panel" onSubmit={createRequest}>
            <label>Choose a service</label>
            <div className="service-grid">
              {services.map((s) => (
                <button
                  type="button"
                  key={s.name}
                  className={`service-option ${category === s.name ? "selected" : ""}`}
                  onClick={() => setCategory(s.name)}
                >
                  <span>{s.icon}</span>
                  <small>{s.name}</small>
                </button>
              ))}
            </div>

            <label htmlFor="location">Your area or city</label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Example: Mylavaram"
              required
            />

            <label htmlFor="problem">Describe your problem</label>
            <textarea
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Example: My kitchen tap is leaking..."
              required
            />

            <button className="primary-button" type="submit">
              Send Service Request →
            </button>
          </form>

          <h2 className="section-title">My requests</h2>
          {requests.length === 0 && (
            <p className="muted">Your service requests will appear here.</p>
          )}
          {requests.map((r) => (
            <article className="request-card" key={r.id}>
              <div className="request-top">
                <strong>{r.category}</strong>
                <span className={`status ${r.status.toLowerCase()}`}>{r.status}</span>
              </div>
              <p>{r.problem}</p>
              <small>📍 {r.location}</small>
              {r.professional && <p>Professional: {r.professional}</p>}
            </article>
          ))}
        </main>
      )}

      {page === "professional" && (
        <main className="dashboard">
          <span className="eyebrow">PROFESSIONAL DASHBOARD</span>
          <h1>Your skills. Your next job.</h1>
          <p className="muted">Set your service category and area to find suitable requests.</p>

          <section className="panel">
            <label>Your name</label>
            <input
              value={proName}
              onChange={(e) => setProName(e.target.value)}
              required
            />

            <label>Service you provide</label>
            <select value={proCategory} onChange={(e) => setProCategory(e.target.value)}>
              {services.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>

            <label>Your service area</label>
            <input
              value={proLocation}
              onChange={(e) => setProLocation(e.target.value)}
              placeholder="Enter the same area as the customer"
            />
          </section>

          <h2 className="section-title">Matching requests ({matching.length})</h2>
          {matching.length === 0 && (
            <div className="empty-state">
              <span>📭</span>
              <h3>No matching requests yet</h3>
              <p>Requests for your selected service and area will appear here.</p>
            </div>
          )}

          {matching.map((r) => (
            <article className="request-card" key={r.id}>
              <div className="request-top">
                <strong>{r.category}</strong>
                <span className="status pending">Pending</span>
              </div>
              <p>{r.problem}</p>
              <small>📍 {r.location}</small>
              <div className="action-row">
                <button className="primary-button" onClick={() => updateRequest(r.id, "Accepted")}>
                  Accept
                </button>
                <button className="decline-button" onClick={() => updateRequest(r.id, "Declined")}>
                  Decline
                </button>
              </div>
            </article>
          ))}

          <h2 className="section-title">Recent decisions</h2>
          {requests.filter((r) => r.status !== "Pending").map((r) => (
            <article className="request-card" key={r.id}>
              <strong>{r.category}</strong>
              <p>{r.problem}</p>
              <span className={`status ${r.status.toLowerCase()}`}>{r.status}</span>
            </article>
          ))}
        </main>
      )}

      <footer>© 2026 LocalPro · Reliable help for your home</footer>
    </div>
  );
}
