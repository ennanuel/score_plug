**Project Name:** ScorePlug: Fullstack Football Match Viewer

**Description:**

ScorePlug is a fullstack application designed to provide a seamless user experience for viewing football (soccer) matches, live scores, and match predictions. It addresses limitations commonly found in public football APIs, such as request limits and data quality.

**Technologies:**

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Node.js, Express, MongoDB, GraphQL
* **Data Source:** [Football API](https://www.football-data.org/documentation/quickstart) (details can be kept private)

**Features:**

* **View Football Matches:** Browse upcoming and past matches with detailed information.
* **Live Scores:** Stay up-to-date with the latest scores and match progress.
* **Match Predictions:** Access calculated predictions based on custom algorithms for an informed view of upcoming matches.
* **Data Source Flexibility:** Adaptable to integrate with different football APIs in the future if desired.

**Motivation:**

This project was driven by a passion for football and a desire to overcome the limitations of existing APIs. By building a custom backend, ScorePlug offers a reliable and efficient solution for accessing football data.

**Project Structure:**

* **score-plug-backend (Backend):** ([Link to GraphQL backend](https://score-plug-backend.onrender.com))
    * Handles data fetching from the football API.
    * Formats and processes data.
    * Calculates match predictions using custom algorithms.
    * Stores data in a MongoDB database.
    * Provides a GraphQL API for the frontend to access data.
* **scoreplug (Frontend):** ([Live project link](https://scoreplug.vercel.app))
    * Built with Next.js for a performant and server-rendered experience.
    * Utilizes Tailwind CSS for a clean and responsive UI.
    * Consumes data from the backend GraphQL API.
    * Renders match information, live scores, and predictions.

**Deployment:**

* Backend: Deployed on Render ([https://render.com/](https://render.com/))
* Frontend: Deployed on Vercel ([https://vercel.com/](https://vercel.com/))

**Next Steps:**

* Enhance the user interface based on user feedback.
* Implement features like user authentication and favorite matches.
* Explore integrating additional football data sources for an even richer experience.

**Contact:**

If like what you see, you could check out more projects on my profile or contact me for more information.