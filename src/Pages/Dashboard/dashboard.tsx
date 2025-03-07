import DashboardFilter from "./components/filter";
import JobList from "./components/jobList";
import SwitchLayer from "./components/switchLayer";

const Dashboard = () => {
  return (
    <section className="dashboard-wrapper">
      <div className="sort-menu-filter flex justify-end mb-4">
        <DashboardFilter />
      </div>

      <div className="alert-layer-wrapper my-6">
        <SwitchLayer />
      </div>

      <div className="job-list">
        <JobList />
      </div>
    </section>
  );
};

export default Dashboard;
