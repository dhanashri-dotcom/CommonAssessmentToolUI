import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ClientSearch.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ClientSearch() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const query = useQuery().get("query");

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/clients/search`, {
        params: { name: query }
      });
      setClients(response.data);
      setError(null); 
    } catch (err) {
      setError("Error fetching clients. Please try again.");
      console.error("Fetch error:", err);
    }
  };

  // Function to navigate to client details page
  const handleClientClick = async (clientId) => {
    navigate(`/client/${clientId}`);
  };

  return (
    <div className="centered-container">
      <div className="form-container">
        <h2>Search Results for "{query}"</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="result-container">
          {clients.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="client-item"
                  onClick={() => handleClientClick(client.id)} 
                  style={{ cursor: "pointer" }} 
                >
                  <strong>{client.name}</strong> (Age: {client.age}, Gender: {client.gender})
                </li>
              ))}
            </ul>
          ) : (
            <div>No clients found for your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientSearch;
