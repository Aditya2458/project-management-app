import {
  useEffect,
  useState,
  useContext,
} from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
};

function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
  });

  const { logout } =
    useContext(AuthContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response =
        await api.get("/projects/");

      setProjects(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProject = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post(
        "/projects/",
        formData
      );

      setFormData({
        title: "",
        description: "",
        status: "active",
      });

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (
    id: number
  ) => {
    try {
      await api.delete(
        `/projects/${id}/`
      );

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Create Project Form */}
      <form
        onSubmit={createProject}
        className="border p-6 rounded shadow mb-10 space-y-4"
      >
        <h2 className="text-xl font-bold">
          Create Project
        </h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Project Title"
          className="border p-2 w-full rounded"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          placeholder="Description"
          className="border p-2 w-full rounded"
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          className="border p-2 w-full rounded"
          onChange={handleChange}
        >
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      </form>

      {/* Project List */}
      <div className="space-y-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="border p-5 rounded shadow flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {project.title}
                </h2>

                <p className="text-gray-700">
                  {project.description}
                </p>

                <span className="text-sm text-gray-500">
                  {project.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(
                      `/projects/${project.id}`
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded h-fit"
                >
                  View Tasks
                </button>

                <button
                  onClick={() =>
                    deleteProject(project.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded h-fit"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No projects yet.
          </p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;