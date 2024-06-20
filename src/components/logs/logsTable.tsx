import { Log } from "@/entities/log";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function LogsTable() {
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 20;

  const query = useQuery({
    queryKey: ["logs", page],
    queryFn: async () => {
      const response = await axiosInstance(token).get(
        `/log?page=${page}&limit=${limit}`
      );
      console.log(response.data);

      // Suppose that response.data is an array of logs
      return response.data as Array<Log>;
    },
    refetchInterval: 1000 * 60, // refresh every minute
  });

  const queryTotal = useQuery({
    queryKey: ["logs_total_count", page],
    queryFn: async () => {
      const response = await axiosInstance(token).get(`/log/count`);
      console.log(response.data);

      // Suppose that response.data is an array of logs
      return response.data;
    },
  });

  const totalLogs = queryTotal.data; // For example purposes
  const totalPages = Math.ceil(totalLogs / limit);

  return (
    <div className="p-0 bg-slate-600 text-white rounded-lg">
      {query.isLoading ? (
        <p>Loading logs...</p>
      ) : query.isError ? (
        <p>Error loading logs: {query.error?.message}</p>
      ) : query.data ? (
        <>
          <table className="w-full mt-4 text-left table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Timestamp</th>
                <th className="px-4 py-2 border-b">Level</th>
                <th className="px-4 py-2 border-b">Service</th>
                <th className="px-4 py-2 border-b">Message</th>
                <th className="px-4 py-2 border-b">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {query.data.map((log) => (
                <tr key={log.id_log}>
                  <td className="px-4 py-2 border-b">
                    {log.createdAt.toString()}
                  </td>
                  <td className="px-4 py-2 border-b">{log.level}</td>
                  <td className="px-4 py-2 border-b">{log.service}</td>
                  <td className="px-4 py-2 border-b">{log.message}</td>
                  <td className="px-4 py-2 border-b">
                    {log.updatedAt.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-blue-300"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-blue-300"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <p>There is no log...</p>
        </>
      )}
    </div>
  );
}
