import React, { useState, useEffect } from 'react';
import "./Jobs.module.css"

const Jobs = ({ loggedInUser, users, jobs, setUsers, setJobs }) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);  // Set the filtered jobs
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If there’s a search query, filter jobs based on title, company name, location, or description
    if (searchQuery !== '') {
      const filtered = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);  // If no search query, display all jobs
    }
  }, [searchQuery, jobs]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle job application
  const handleApply = async (jobId) => {
    if (!loggedInUser) {
      alert('You must be logged in to apply for a job.');
      return;
    }

    // Find the user who is logged in
    const user = users.find((u) => u.id === loggedInUser.id);
    if (!user) {
      alert('User not found');
      return;
    }

    // Check if the user has already applied for the job
    if (user.profile.appliedJobs.includes(jobId)) {
      alert('You have already applied for this job.');
      return;
    }

    // Update the user's applied jobs list (locally)
    const updatedUsers = users.map((u) => {
      if (u.id === loggedInUser.id) {
        return {
          ...u,
          profile: {
            ...u.profile,
            appliedJobs: [...u.profile.appliedJobs, jobId],
          },
        };
      }
      return u;
    });

    // Update the job's applications list (locally)
    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId) {
        return {
          ...job,
          applications: [...job.applications, loggedInUser.id], // Add the user to the job's applications
        };
      }
      return job;
    });

    // Optionally, send updates to the server (e.g., via POST or PUT requests)
    try {
      // Simulate saving the application (use an API call here)
      await fetch('https://json-server-template-5ash.onrender.com/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: loggedInUser.id,
          jobId: jobId,
          status: 'applied',
          appliedDate: new Date().toISOString(),
        }),
      });

      // Update the state with the new data
      setUsers(updatedUsers);
      setJobs(updatedJobs);
      alert('You have successfully applied for the job!');
    } catch (error) {
      console.error('Failed to apply for job:', error);
      alert('There was an error applying for the job.');
    }
  };

  return (
    <header className="head" id="jobs">
      <div id="bar">
        <div className="container-fluid">
          <form className="d-flex">
            <input
              className="form-control me-2"
              id="nav"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" id="btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <section>
        <div id="job">
          {loading ? (
            <p>Loading jobs...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ul className="list-group">
              {filteredJobs.map((job) => (
                <li className="list-group-item" key={job.id}>
                  <div className="job-image">
                    <img src={job.imageUrl || 'https://via.placeholder.com/150'} alt={job.companyName} className="job-logo" />
                  </div>
                  <h5>{job.title}</h5>
                  <p><strong>Company:</strong> {job.companyName}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Requirements:</strong> {job.requirements.join(', ')}</p>
                  <p><strong>Salary Range:</strong> {job.salary}</p>
                  <p><strong>Posted Date:</strong> {job.postedDate}</p>
                  <p><strong>Applications:</strong> {job.applications.length}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApply(job.id)}
                    disabled={job.applications.includes(loggedInUser?.id)}  // Disable if already applied
                  >
                    {job.applications.includes(loggedInUser?.id) ? 'Applied' : 'Apply'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </header>
  );
};

export default Jobs;
