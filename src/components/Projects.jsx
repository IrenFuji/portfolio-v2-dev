import React from "react";

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>

        {/* Example project card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Slingair (Demo)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Coming soon... 
            </p>
            <div className="mt-4 h-48 flex items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700">
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Project Preview
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
