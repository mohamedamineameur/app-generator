<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="app-generator.png" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# APP-GENERATOR

<em>Build Fast, Innovate Fearlessly, Launch Confidently</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/license/mohamedamineameur/app-generator?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/mohamedamineameur/app-generator?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/mohamedamineameur/app-generator?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/mohamedamineameur/app-generator?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat&logo=dotenv&logoColor=black" alt=".ENV">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
<img src="https://img.shields.io/badge/Ajv-23C8D2.svg?style=flat&logo=Ajv&logoColor=white" alt="Ajv">
<br>
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Sequelize-52B0E7.svg?style=flat&logo=Sequelize&logoColor=white" alt="Sequelize">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">

</div>
<br>

---

## 📄 Table of Contents

- [Overview](#-overview)
- [Getting Started](#-getting-started)
    - [Prerequisites](#-prerequisites)
    - [Installation](#-installation)
    - [Usage](#-usage)
    - [Testing](#-testing)
- [Features](#-features)
- [Project Structure](#-project-structure)
    - [Project Index](#-project-index)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgment](#-acknowledgment)

---

## ✨ Overview

app-generator is a developer-focused scaffolding tool that simplifies building full-stack web applications with React, TypeScript, and a Node.js backend. It provides a structured architecture with dedicated services, schemas, and secure authentication, enabling rapid development and maintainability.

**Why app-generator?**

This project aims to streamline the creation of scalable web apps by integrating modern frontend tooling with a robust backend architecture. The core features include:

- 🛠️ **Fast Frontend Setup:** Utilizes Vite, React, and TypeScript for quick, hot-reloadable UI development.
- 🔧 **Modular API Layer:** Provides dedicated services for managing albums, blogs, pages, and user data.
- 🔒 **Secure Authentication:** Implements role-based access control with JWT middleware for protected routes.
- 🧪 **Automated Testing:** Includes fixtures and comprehensive route tests to ensure code reliability.
- ⚙️ **Entity Generator:** An interactive utility to rapidly create new data schemas, supporting project scalability.

---

## 📌 Features

|      | Component            | Details                                                                                     |
| :--- | :------------------- | :------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**     | <ul><li>Modular monorepo with separate `client` (React) and `server` (Express) folders</li><li>Client uses React with Vite for build tooling</li><li>Server built with Node.js + Express, structured with middleware and route separation</li></ul> |
| 🔩 | **Code Quality**     | <ul><li>TypeScript used extensively for type safety</li><li>ESLint configured with `@eslint/js` and plugins for React and Node</li><li>Preconfigured `tsconfig` files for different build contexts</li></ul> |
| 📄 | **Documentation**    | <ul><li>Basic README with project overview</li><li>TypeScript types and interfaces documented within code</li><li>Package.json scripts for build, start, test</li></ul> |
| 🔌 | **Integrations**     | <ul><li>React for frontend UI</li><li>Express for backend API</li><li>Sequelize ORM with SQLite3 for database</li><li>Jest and Supertest for testing</li><li>Vite for frontend bundling</li><li>ESLint and Prettier for code linting and formatting</li></ul> |
| 🧩 | **Modularity**       | <ul><li>Separate packages for client and server</li><li>Reusable components in React</li><li>Express middleware for cross-cutting concerns</li></ul> |
| 🧪 | **Testing**          | <ul><li>Unit tests with Jest (`ts-jest`)</li><li>API tests with Supertest</li><li>TypeScript support for test files</li></ul> |
| ⚡️  | **Performance**      | <ul><li>Vite provides fast hot module replacement for development</li><li>Code splitting in React for optimized load times</li></ul> |
| 🛡️ | **Security**         | <ul><li>Helmet middleware in Express for security headers</li><li>Environment variables managed via dotenv</li></ul> |
| 📦 | **Dependencies**     | <ul><li>Core dependencies include React, Express, Sequelize, SQLite3, TypeScript</li><li>Dev dependencies include ESLint, Jest, Supertest, Vite, ts-node</li></ul> |

---

## 📁 Project Structure

```sh
└── app-generator/
    ├── client
    │   ├── .gitignore
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   ├── tsconfig.app.json
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   └── vite.config.ts
    └── server
        ├── jest.config.js
        ├── package-lock.json
        ├── package.json
        ├── src
        └── tsconfig.json
```

---

### 📑 Project Index

<details open>
	<summary><b><code>APP-GENERATOR/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
			</table>
		</blockquote>
	</details>
	<!-- client Submodule -->
	<details>
		<summary><b>client</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ client</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the client-side configuration and dependencies for the web application, enabling development, building, and previewing of the user interface<br>- It orchestrates the setup of React-based components, manages development workflows with Vite, and ensures type safety with TypeScript, forming the foundation for a responsive and maintainable front-end within the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/vite.config.ts'>vite.config.ts</a></b></td>
					<td style='padding: 8px;'>- Configure the development environment for the client-side application by setting up Vite with React support<br>- It streamlines the build process, enabling fast development and hot module replacement, which enhances the overall user experience and developer productivity within the project’s architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/index.html'>index.html</a></b></td>
					<td style='padding: 8px;'>- Establishes the foundational HTML structure for the client-side application, setting up the environment for rendering a React-based user interface<br>- It links essential resources, configures viewport settings for responsiveness, and designates the root element where the React components will mount, enabling seamless integration of the frontend with the overall architecture built with Vite, React, and TypeScript.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Defines the TypeScript project references for the client-side codebase, enabling seamless integration and type safety across multiple configuration files<br>- It orchestrates the compilation process by linking core application and Node.js-specific settings, ensuring consistent development and build environments within the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Provides a minimal React and TypeScript setup optimized for development with Vite, enabling Hot Module Replacement and ESLint integration<br>- Facilitates rapid UI development while maintaining code quality through recommended linting configurations<br>- Serves as a foundational template for building scalable, maintainable React applications with streamlined tooling and best practices.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/tsconfig.node.json'>tsconfig.node.json</a></b></td>
					<td style='padding: 8px;'>- Defines TypeScript compiler options tailored for the client-side development environment, ensuring consistent build configurations and type safety<br>- It optimizes the development process by specifying module resolution, target environments, and linting rules, thereby supporting a robust and efficient build system within the overall project architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/tsconfig.app.json'>tsconfig.app.json</a></b></td>
					<td style='padding: 8px;'>- Defines TypeScript compiler options for the client-side application, ensuring consistent build settings aligned with modern JavaScript standards and React development<br>- Facilitates optimized, type-safe code compilation within the overall project architecture, supporting efficient development and seamless integration of client-side features.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/eslint.config.js'>eslint.config.js</a></b></td>
					<td style='padding: 8px;'>- Defines ESLint configuration tailored for TypeScript and React projects, ensuring code quality and consistency across client-side code<br>- Integrates recommended linting rules, React hooks, and refresh plugins to facilitate best practices, improve developer experience, and maintain a clean, error-free codebase within the overall architecture.</td>
				</tr>
			</table>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ client.src</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/main.tsx'>main.tsx</a></b></td>
							<td style='padding: 8px;'>- Initialize and render the main React application within the DOM, establishing the entry point for the client-side user interface<br>- It sets up the root rendering context, applies strict mode for development best practices, and integrates the primary App component to facilitate user interactions and overall application functionality.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/vite-env.d.ts'>vite-env.d.ts</a></b></td>
							<td style='padding: 8px;'>- Establishes type declarations for Vites client environment, ensuring seamless integration and type safety within the development workflow<br>- Supports consistent configuration and enhances developer experience by enabling accurate code completion and validation across the client-side codebase in the Vite-powered project.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/App.tsx'>App.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides the core user interface for a counter application, enabling users to increment and decrement a displayed count<br>- It serves as the primary interactive component within the client-side architecture, facilitating real-time state updates and user engagement in the overall React-based project<br>- This component forms the foundation for user interaction and dynamic content rendering.</td>
						</tr>
					</table>
					<!-- services Submodule -->
					<details>
						<summary><b>services</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ client.src.services</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/album.service.ts'>album.service.ts</a></b></td>
									<td style='padding: 8px;'>- Defines a service layer for managing album data, enabling creation, retrieval, updating, and deletion of albums through API endpoints<br>- Facilitates interaction with backend album resources, supporting both user-facing and management-specific operations within the applications architecture<br>- Enhances modularity and maintainability by abstracting API calls related to album management.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/blog.service.ts'>blog.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an abstraction layer for managing blog content through API interactions, enabling creation, retrieval, updating, and deletion of blog entries<br>- Facilitates seamless communication between the frontend and backend services for blog-related operations, supporting both user-facing and administrative functionalities within the applications architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/blogContent.service.ts'>blogContent.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an abstraction layer for managing blog content through API interactions, enabling creation, retrieval, updating, and deletion of blog entries<br>- Integrates seamlessly within the client-side architecture to facilitate dynamic content management, supporting the overall content delivery and editing workflows of the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/picture.service.ts'>picture.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an abstraction layer for managing picture data within the application, enabling creation, retrieval, updating, and deletion of pictures through API interactions<br>- Facilitates seamless integration between the frontend and backend services for picture-related operations, supporting both user-facing and administrative functionalities in the overall architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/user.service.ts'>user.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an abstraction layer for user management operations within the client application<br>- Facilitates creating, retrieving, updating, and deleting user data by interfacing with the backend API<br>- Serves as a centralized service to streamline user-related interactions, supporting the overall architectures modularity and maintainability in handling user data workflows.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/main.service.ts'>main.service.ts</a></b></td>
									<td style='padding: 8px;'>- Establishes a centralized API client for seamless communication with backend services, ensuring consistent request configuration across the application<br>- Facilitates secure, credentialed data exchanges and simplifies integration with server endpoints, supporting the overall architectures modularity and maintainability in the client-side service layer.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/pageContent.service.ts'>pageContent.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an API interface for managing page content entities within the application<br>- Facilitates creating, retrieving, updating, and deleting page content data, enabling seamless integration between the frontend and backend services<br>- Supports dynamic content management essential for rendering and maintaining web pages in the overall architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/content.service.ts'>content.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an interface for managing content data within the application, enabling creation, retrieval, updating, and deletion of content items<br>- Facilitates communication with backend APIs for content operations, supporting both user-facing and administrative functionalities to ensure seamless content management across the platform.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/client/src/services/page.service.ts'>page.service.ts</a></b></td>
									<td style='padding: 8px;'>- Provides an abstraction layer for managing page data within the application, enabling creation, retrieval, updating, and deletion of pages through API interactions<br>- Facilitates seamless integration between the frontend and backend services for page-related operations, supporting both user-facing and administrative functionalities in the overall architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- server Submodule -->
	<details>
		<summary><b>server</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ server</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the core server configuration and startup procedures for the generative project, orchestrating the applications runtime environment, dependencies, and scripts<br>- It facilitates development, testing, and deployment workflows, ensuring seamless integration of middleware, security, and database connectivity within the overall architecture<br>- This setup underpins the backends ability to handle API requests, data generation, and validation tasks.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Defines the TypeScript compilation settings for the server-side codebase, ensuring consistent and optimized JavaScript output aligned with modern standards<br>- It facilitates smooth development and deployment by specifying how source files are transformed and organized within the project architecture<br>- This configuration underpins the overall stability and maintainability of the server environment.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/jest.config.js'>jest.config.js</a></b></td>
					<td style='padding: 8px;'>- Configures the testing environment for the server-side codebase by specifying Jest settings tailored for TypeScript<br>- Ensures consistent and reliable execution of unit tests across the project, facilitating quality assurance and maintainability within the overall architecture<br>- Supports seamless integration of TypeScript with Jest, enabling efficient testing workflows for server components.</td>
				</tr>
			</table>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ server.src</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/run-tests.ts'>run-tests.ts</a></b></td>
							<td style='padding: 8px;'>- Automates the execution of test suites by detecting and prioritizing test files marked with exclusive flags, ensuring focused testing during development<br>- Integrates seamlessly into the testing workflow within the project architecture, optimizing test runs by executing only specified tests when present or running the full suite otherwise<br>- Enhances testing efficiency and accuracy across the codebase.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/server.ts'>server.ts</a></b></td>
							<td style='padding: 8px;'>- Establishes the core Express server setup, integrating essential middleware for security, data handling, and performance<br>- Connects to the database and defines the main routing structure, enabling the application to handle incoming requests efficiently<br>- Serves as the foundational entry point for the backend, orchestrating server initialization and request processing within the overall architecture.</td>
						</tr>
					</table>
					<!-- schemas Submodule -->
					<details>
						<summary><b>schemas</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ server.src.schemas</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/schemas/page.schema.ts'>page.schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the schema for page entities within the application, ensuring consistent data validation across create, read, update, and delete operations<br>- It facilitates structured data handling for pages, supporting multilingual titles and publication status, thereby maintaining data integrity and coherence within the overall content management architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/schemas/picture.schema.ts'>picture.schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the schema for picture entities within the application, specifying data structure, validation rules, and required fields for creating, updating, and managing pictures associated with albums<br>- Facilitates consistent data validation and integrity across API operations related to picture management in the overall system architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/schemas/album.schema.ts'>album.schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines validation schemas for album entities within the application, ensuring data consistency and integrity across create, read, update, and delete operations<br>- These schemas facilitate structured data handling for album-related functionalities, supporting the overall architecture by standardizing data formats and enforcing business rules for album management.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/schemas/content.schema.ts'>content.schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines validation schemas for content management, ensuring data integrity for multilingual content and publication status<br>- Supports create, read, update, and delete operations within the content lifecycle, facilitating consistent data handling across the applications architecture<br>- These schemas underpin the server-side validation layer, maintaining structured and reliable content data throughout the system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/schemas/user.schema.ts'>user.schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines validation schemas for user-related operations within the application, ensuring data integrity and consistency across user creation, authentication, retrieval, updating, and deletion processes<br>- These schemas serve as a blueprint for input validation, supporting the overall architecture by standardizing data formats and enforcing rules for user management functionalities.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/schemas/pageContent.schema.ts'>pageContent.schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines validation schemas for managing page content relationships within the application<br>- Facilitates creation, retrieval, updating, and deletion of page content associations, ensuring data integrity and consistency across the system<br>- Serves as a foundational component for handling structured content organization in the overall architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/schemas/blogContent.schema.ts'>blogContent.schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the schema for blog content associations, enabling structured validation and management of relationships between blogs and their content items<br>- Facilitates consistent data handling for creating, reading, updating, and deleting blog content links within the overall application architecture<br>- Ensures data integrity and supports flexible content organization in the blogging platform.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/schemas/blog.schema.ts'>blog.schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the schema for blog entities, ensuring consistent data validation across create, read, update, and delete operations within the application<br>- Facilitates structured data handling for multilingual blog titles and publication status, supporting the overall architectures focus on robust, validated content management<br>- Enhances data integrity and consistency throughout the blog management workflow.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- routes Submodule -->
					<details>
						<summary><b>routes</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ server.src.routes</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/main.routes.ts'>main.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the primary routing structure for the API, orchestrating access to various resource-specific endpoints such as users, albums, pictures, blogs, pages, and content management<br>- It centralizes route registration, ensuring organized and scalable API endpoint handling within the server architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/pageContent.routes.ts'>pageContent.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines API endpoints for managing page content within the application, enabling creation, retrieval, updating, and deletion of content items<br>- Integrates authentication middleware to secure modification routes, supporting dynamic content management and ensuring data integrity across the platforms content architecture<br>- Facilitates seamless interaction between client requests and backend content operations.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/album.routes.ts'>album.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines RESTful API endpoints for managing album resources, enabling creation, retrieval, updating, and deletion of albums<br>- Incorporates authentication middleware for protected routes and distinguishes between public and management-specific operations, supporting both user-facing and administrative functionalities within the overall application architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/blog.routes.ts'>blog.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the routing logic for blog-related operations within the application, facilitating creation, retrieval, updating, and deletion of blog posts<br>- It manages access control for administrative functions through authentication middleware and supports both public and management-specific endpoints, integrating with controller functions to handle core business logic in the overall server architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/page.routes.ts'>page.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines API endpoints for managing pages within the application, facilitating creation, retrieval, updating, and deletion of page data<br>- Implements access control for sensitive operations through authentication middleware and distinguishes between general user and administrative management routes, supporting both public and protected interactions with page resources.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/blogContent.routes.ts'>blogContent.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the routing logic for managing blog content within the application, enabling creation, retrieval, updating, and deletion of blog posts<br>- Integrates authentication middleware to secure modification operations, facilitating seamless interaction with the blog content controller and supporting the overall content management architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/user.routes.ts'>user.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines user management routes within the API, enabling creation, retrieval, updating, and deletion of user data<br>- Implements authentication and role-based authorization to secure access, and includes login functionality<br>- Integrates with controller functions to facilitate user-related operations, supporting the overall architectures focus on secure, role-restricted user handling.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/content.routes.ts'>content.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines API endpoints for managing content resources, enabling creation, retrieval, updating, and deletion<br>- Supports both public access for viewing content and authenticated routes for administrative management tasks<br>- Integrates with middleware to ensure secure access, facilitating organized content handling within the overall application architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/routes/picture.routes.ts'>picture.routes.ts</a></b></td>
									<td style='padding: 8px;'>- Defines API endpoints for managing picture resources, enabling creation, retrieval, updating, and deletion within the application<br>- Supports both public access for viewing pictures and authenticated routes for administrative management functions, integrating seamlessly into the overall server architecture to facilitate efficient picture data handling and access control.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- utils Submodule -->
					<details>
						<summary><b>utils</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ server.src.utils</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/utils/entity-generator.ts'>entity-generator.ts</a></b></td>
									<td style='padding: 8px;'>- The <code>entity-generator.ts</code> script serves as an interactive utility within the codebase to streamline the creation of new data entities<br>- It guides users through defining an entitys name, its relationships to other entities, and its attributes, facilitating consistent and efficient schema development<br>- This tool supports the overall architecture by enabling rapid, standardized expansion of the data model, ensuring that new entities integrate seamlessly into the applications data layer and maintain alignment with the project's structural conventions.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/utils/validateSchema.ts'>validateSchema.ts</a></b></td>
									<td style='padding: 8px;'>- Provides schema validation capabilities to ensure data integrity across the application<br>- It leverages Ajv to verify that data conforms to predefined schemas, facilitating consistent data validation throughout the server-side codebase<br>- This utility supports robust input validation, helping prevent invalid data from propagating within the system architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/utils/pre-test.ts'>pre-test.ts</a></b></td>
									<td style='padding: 8px;'>- Facilitates database preparation for testing by synchronizing the schema, ensuring a clean and consistent environment<br>- It streamlines test setup processes within the project’s architecture, enabling reliable and repeatable test executions<br>- This utility supports maintaining database integrity during automated testing workflows, contributing to robust quality assurance practices across the codebase.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- config Submodule -->
					<details>
						<summary><b>config</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ server.src.config</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/config/database.ts'>database.ts</a></b></td>
									<td style='padding: 8px;'>- Establishes the database connection configuration for the application, enabling data persistence and retrieval<br>- It dynamically selects an in-memory database for testing environments and a file-based SQLite database for development and production, ensuring seamless data management across different stages of the project lifecycle.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- controllers Submodule -->
					<details>
						<summary><b>controllers</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ server.src.controllers</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/controllers/album.controller.ts'>album.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines core CRUD operations for managing album data within the server architecture, facilitating creation, retrieval, updating, and deletion of album records<br>- Supports both public and administrative endpoints, ensuring proper validation and access control, and integrates seamlessly with the data model to maintain album information consistency across the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/controllers/page.controller.ts'>page.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines core CRUD operations for managing pages within the application, facilitating creation, retrieval, updating, and deletion of page data<br>- Serves as the primary controller layer, orchestrating interactions between incoming requests and the page data model, ensuring data validation and appropriate response handling to support content management and access control across the platform.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/controllers/blogContent.controller.ts'>blogContent.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines core CRUD operations for managing blog content within the application, facilitating creation, retrieval, updating, and deletion of blog entries<br>- Integrates schema validation to ensure data integrity and interacts with the database model to maintain consistent content management<br>- Serves as a key controller layer, enabling seamless content handling aligned with the overall backend architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/controllers/user.controller.ts'>user.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines core user management operations within the backend architecture, enabling creation, retrieval, updating, and deletion of user records<br>- Ensures data validation, enforces password security standards, and manages user data interactions with the database, supporting the overall systems user authentication and profile handling functionalities.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/controllers/blog.controller.ts'>blog.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines core CRUD operations for managing blog content within the server architecture, facilitating creation, retrieval, updating, and deletion of blog entries<br>- Ensures proper validation and access control, supporting both public and administrative views, and integrates seamlessly with the data model to maintain consistent content management across the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/controllers/content.controller.ts'>content.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines core CRUD operations for managing content within the application, facilitating creation, retrieval, updating, and deletion of content records<br>- Serves as the primary interface between client requests and the data layer, ensuring content management aligns with user roles and publication status, thereby supporting the overall content lifecycle and access control architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/controllers/picture.controller.ts'>picture.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines core CRUD operations for managing picture entities within the application, including creation, retrieval, updating, and deletion<br>- Ensures proper validation and association with published albums, facilitating seamless integration of picture data into the overall content management architecture<br>- Supports both public and administrative workflows, maintaining data integrity and access control across the system.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/controllers/pageContent.controller.ts'>pageContent.controller.ts</a></b></td>
									<td style='padding: 8px;'>- Defines CRUD operations for managing page content within the application, enabling creation, retrieval, updating, and deletion of page content records<br>- Integrates schema validation to ensure data integrity and interacts with the database model to perform persistent data management<br>- Serves as a core controller layer facilitating content management functionalities in the overall architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- specs Submodule -->
					<details>
						<summary><b>specs</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ server.src.specs</b></code>
							<!-- routes Submodule -->
							<details>
								<summary><b>routes</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ server.src.specs.routes</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/routes/blog.routes.test.ts'>blog.routes.test.ts</a></b></td>
											<td style='padding: 8px;'>- Defines comprehensive tests for blog-related API endpoints, ensuring correct functionality for creating, retrieving, updating, and deleting blog posts<br>- Validates role-based access control, including admin privileges, and verifies proper handling of published and unpublished blogs within the overall application architecture<br>- Facilitates robust quality assurance for the blog management features in the system.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/routes/user.routes.test.ts'>user.routes.test.ts</a></b></td>
											<td style='padding: 8px;'>- Defines and tests user-related API endpoints within the applications backend architecture, ensuring core user management functionalities such as creation, retrieval, updating, and deletion operate correctly<br>- Serves as a critical validation layer for the user routes, supporting secure and reliable user data handling in the overall system.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/routes/picture.routes.test.ts'>picture.routes.test.ts</a></b></td>
											<td style='padding: 8px;'>- Defines comprehensive tests for the picture management API, ensuring correct functionality for creating, retrieving, updating, and deleting pictures<br>- Validates access control, data integrity, and response consistency, supporting robust API behavior within the overall application architecture<br>- Facilitates quality assurance and helps maintain reliable endpoints for picture-related operations.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/routes/pageContent.routes.test.ts'>pageContent.routes.test.ts</a></b></td>
											<td style='padding: 8px;'>- Defines and verifies the API endpoints for managing page content associations within the application<br>- Facilitates creation, retrieval, updating, and deletion of page content records, ensuring proper functionality and integration with user roles and page structures<br>- Supports comprehensive testing to maintain the integrity of page content management in the overall system architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/routes/album.routes.test.ts'>album.routes.test.ts</a></b></td>
											<td style='padding: 8px;'>- Defines comprehensive tests for album-related API endpoints, ensuring correct functionality for creating, retrieving, updating, and deleting albums<br>- Validates role-based access control, data integrity, and response consistency within the overall server architecture, supporting reliable management of album resources and maintaining application robustness.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/routes/blogContent.routes.test.ts'>blogContent.routes.test.ts</a></b></td>
											<td style='padding: 8px;'>- Defines and tests the API endpoints for managing blog content associations, including creation, retrieval, updating, and deletion<br>- Ensures the correctness and reliability of blog content operations within the overall application architecture, facilitating seamless content management and integration with user authentication and related data models.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/routes/page.routes.test.ts'>page.routes.test.ts</a></b></td>
											<td style='padding: 8px;'>- Defines comprehensive tests for the page management API, ensuring core functionalities such as creation, retrieval, updating, and deletion operate correctly within the applications architecture<br>- Validates role-based access controls, data integrity, and response consistency, supporting robust and secure page handling across different user roles, including administrative privileges.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/routes/content.routes.test.ts'>content.routes.test.ts</a></b></td>
											<td style='padding: 8px;'>- Defines comprehensive tests for content management routes, ensuring correct functionality for creating, retrieving, updating, and deleting content within the application<br>- Validates role-based access controls, content visibility, and data integrity, supporting the overall architecture by verifying that content-related endpoints operate securely and reliably across different user roles and states.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- fixtures Submodule -->
							<details>
								<summary><b>fixtures</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ server.src.specs.fixtures</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/fixtures/blog.fixture.ts'>blog.fixture.ts</a></b></td>
											<td style='padding: 8px;'>- Provides a fixture function to generate sample blog entries for testing purposes, enabling consistent and flexible creation of blog data with customizable attributes<br>- Supports the overall testing architecture by facilitating reliable setup of blog-related data, ensuring that test scenarios involving blog content can be executed efficiently and accurately within the applications data layer.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/fixtures/album.fixture.ts'>album.fixture.ts</a></b></td>
											<td style='padding: 8px;'>- Provides a fixture for creating sample album data within the testing environment, facilitating consistent and customizable test setups<br>- It streamlines the process of generating album instances with default or overridden attributes, supporting the overall testing architecture by ensuring reliable and reusable test data for validating album-related functionalities.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/fixtures/page.fixture.ts'>page.fixture.ts</a></b></td>
											<td style='padding: 8px;'>- Provides a fixture function to create and initialize Page model instances with customizable attributes for testing purposes<br>- Facilitates consistent setup of page data within the testing suite, supporting the overall architecture by enabling reliable and reusable test data generation for page-related features<br>- Ensures streamlined testing workflows and data integrity across the codebase.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/fixtures/blogContent.fixture.ts'>blogContent.fixture.ts</a></b></td>
											<td style='padding: 8px;'>- Provides a fixture for creating sample blog content associations within the testing environment, enabling consistent and streamlined setup of blog-related data<br>- Facilitates the linking of blog entries with their respective content, supporting comprehensive testing of content management and display functionalities within the overall application architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/fixtures/pageContent.fixture.ts'>pageContent.fixture.ts</a></b></td>
											<td style='padding: 8px;'>- Defines a fixture for creating sample PageContent entities, linking pages and content items within the testing environment<br>- Facilitates the setup of consistent, interconnected data structures essential for validating page composition and content management workflows in the application architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/fixtures/picture.fixture.ts'>picture.fixture.ts</a></b></td>
											<td style='padding: 8px;'>- Provides a fixture for creating sample Picture records within the testing environment, ensuring consistent and reliable test data<br>- It facilitates the setup of picture entities linked to albums, with customizable attributes, supporting comprehensive testing of features involving media management and album-picture relationships in the overall application architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/fixtures/content.fixture.ts'>content.fixture.ts</a></b></td>
											<td style='padding: 8px;'>- Provides a fixture for creating test content entries with customizable attributes, facilitating consistent and efficient setup of content data during testing<br>- It supports multilingual content and publication status, integrating seamlessly with the content model to ensure reliable test scenarios within the overall application architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/specs/fixtures/user.fixture.ts'>user.fixture.ts</a></b></td>
											<td style='padding: 8px;'>- Provides a fixture for generating realistic user data within the testing environment, facilitating consistent and efficient creation of user records<br>- It streamlines test setup by producing user objects with hashed passwords and optional overrides, supporting comprehensive testing of user-related functionalities in the applications architecture.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- models Submodule -->
					<details>
						<summary><b>models</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ server.src.models</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/models/content.model.ts'>content.model.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the Content data model within the applications database schema, facilitating storage and retrieval of multilingual content along with publication status<br>- It supports content management workflows by representing content entities with metadata such as creation and update timestamps, enabling efficient handling of localized and publishable content across the platform.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/models/blog.model.ts'>blog.model.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the Blog data model within the server architecture, facilitating structured storage and retrieval of blog-related information<br>- It establishes the schema for blog entries, including multilingual titles and publication status, enabling seamless integration with database operations and supporting content management functionalities across the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/models/page.model.ts'>page.model.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the Page model within the applications data layer, representing web pages with multilingual titles and publication status<br>- It facilitates structured storage and retrieval of page information, supporting content management and dynamic rendering in the overall architecture<br>- This model integrates seamlessly with the database, enabling efficient data operations across the project.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/models/blogContent.model.ts'>blogContent.model.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the association between blogs and their content pieces within the database schema, enabling structured management of blog content relationships<br>- Facilitates linking multiple content items to a single blog with specified order, supporting dynamic content composition and retrieval in the overall application architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/models/album.model.ts'>album.model.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the Album data model within the applications database schema, representing musical albums with multilingual titles and publication status<br>- It facilitates structured storage and retrieval of album information, supporting core functionalities related to managing and displaying album collections across the platform<br>- This model integrates seamlessly into the overall architecture for data consistency and integrity.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/models/picture.model.ts'>picture.model.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the data model for storing and managing picture information within the applications media library<br>- It establishes relationships between pictures and albums, enabling efficient retrieval, organization, and manipulation of image assets, supporting multilingual descriptions and publication status as part of the overall content management architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/models/user.model.ts'>user.model.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the User data model within the applications database schema, enabling structured storage and management of user information<br>- It facilitates user authentication, authorization, and role-based access control, serving as a core component for user-related functionalities across the system architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/models/pageContent.model.ts'>pageContent.model.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the relationship between pages and content items within the application, enabling dynamic assembly and management of page layouts<br>- Facilitates linking multiple content pieces to individual pages with specified order, supporting flexible content organization and rendering in the overall system architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- middlewares Submodule -->
					<details>
						<summary><b>middlewares</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ server.src.middlewares</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/middlewares/login.ts'>login.ts</a></b></td>
									<td style='padding: 8px;'>- Facilitates user authentication by verifying credentials and issuing secure JWT tokens, enabling session management within the application<br>- Integrates with user data models and validation schemas to ensure proper login flow, contributing to the overall security and access control architecture of the system<br>- This middleware is essential for managing authenticated user sessions across the backend services.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/middlewares/authorization.ts'>authorization.ts</a></b></td>
									<td style='padding: 8px;'>- Implements role-based access control by verifying JWT tokens stored in cookies, ensuring users possess appropriate permissions before granting access to protected routes<br>- Serves as a critical security middleware within the server architecture, safeguarding sensitive endpoints and maintaining authorization integrity across the application.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/mohamedamineameur/app-generator/blob/master/server/src/middlewares/isAuthenticated.ts'>isAuthenticated.ts</a></b></td>
									<td style='padding: 8px;'>- Implements authentication middleware that verifies user identity via JWT tokens stored in cookies, ensuring secure access control within the server architecture<br>- It validates tokens, retrieves user data from the database, and attaches authenticated user information to requests, facilitating protected route access and maintaining overall security integrity across the application.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## 🚀 Getting Started

### 📋 Prerequisites

This project requires the following dependencies:

- **Programming Language:** TypeScript
- **Package Manager:** Npm

### ⚙️ Installation

Build app-generator from the source and install dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/mohamedamineameur/app-generator
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd app-generator
    ```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

### 💻 Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### 🧪 Testing

App-generator uses the {__test_framework__} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

## 📈 Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## 🤝 Contributing

- **💬 [Join the Discussions](https://github.com/mohamedamineameur/app-generator/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/mohamedamineameur/app-generator/issues)**: Submit bugs found or log feature requests for the `app-generator` project.
- **💡 [Submit Pull Requests](https://github.com/mohamedamineameur/app-generator/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/mohamedamineameur/app-generator
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/mohamedamineameur/app-generator/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=mohamedamineameur/app-generator">
   </a>
</p>
</details>

---

## 📜 License

App-generator is protected under the [LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## ✨ Acknowledgments

- Credit `contributors`, `inspiration`, `references`, etc.

<div align="left"><a href="#top">⬆ Return</a></div>

---
