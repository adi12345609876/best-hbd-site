"use client";

function Removebtn({ id }) {
  const deleteTopic = async (id) => {
    const res = await fetch(`/api/hbdRem?id=${id}`, {
      method: "DELETE",
    });
    location.reload();
  };
  return (
    <button
      onClick={() => deleteTopic(id)}
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Delete
    </button>
  );
}

export default Removebtn;
