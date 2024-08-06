import { useState } from 'react';
import axios from 'axios';
import SearchBar from "./SearchBar.jsx";
import JobItem from "./JobItem.jsx";
import MyPagination from "./MyPagination.jsx";
import MyLoader from "./MyLoader.jsx";
import {Container} from "@mui/material";

const JobApiContainer = () => {
  const [token, setToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobCount, setJobCount] = useState(null);

  const fetchToken = async () => {
    try {
      const response = await axios.post('https://api.jobijoba.com/v3/fr/login', {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET
      });
      const currentTime = new Date();
      const expiryTime = new Date(currentTime.getTime() + 60 * 60 * 1000);

      setToken(response.data.token);
      setTokenExpiry(expiryTime);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tokenExpiry', expiryTime);

      return response.data.token;
    } catch (err) {
      setError('Error fetching token');
      console.error(err);
    }
  };

  const fetchJobs = async ({token, page}) => {
    try {
      const pageToUse = (page === null ? currentPage : page);
      const response = await axios.get('https://api.jobijoba.com/v3/fr/ads/search', {
        params: {
          what,
          where,
          limit: 5,
          page: pageToUse
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setJobs(response.data.data.ads);
      setJobCount(response.data.data.total);
      setLoading(false);
    } catch (err) {
      setError('Error fetching jobs');
      console.error(err);
    }
  };


  const isTokenExpired = (currentExpiry) => {
    const expiryTime = Date.parse(currentExpiry);
    return new Date() >= expiryTime;
  };

  const fetchJobsOnClick = async ({page = null}) => {
    setLoading(true);
    setError(null);

    let currentToken = token;
    let currentExpiry = tokenExpiry;

    if (!currentToken) {
      currentToken = localStorage.getItem('token');
      currentExpiry = localStorage.getItem('tokenExpiry');
      setToken(currentToken);
      setTokenExpiry(currentExpiry);
    }

    if (!currentToken || !currentExpiry || isTokenExpired(currentExpiry)) {
      currentToken = await fetchToken();
    }

    if (currentToken) {
      await fetchJobs({token: currentToken, page});
    }

    setLoading(false);
  };

  return (
    <Container maxWidth='lg'>
      <SearchBar
        loading={loading}
        clickHandler={fetchJobsOnClick}
        what={what}
        setWhat={setWhat}
        where={where}
        setWhere={setWhere}
      />
      {loading ? (
        <MyLoader/>
      ) : (
        <>
          {error && <div>{error}</div>}
          {jobs.map((job) => (
            <JobItem key={job.id} job={job}/>
          ))}
          {jobCount && <MyPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            jobCount={jobCount}
            clickHandler={fetchJobsOnClick}
          />}
        </>
      )}
    </Container>
  );
};

export default JobApiContainer;