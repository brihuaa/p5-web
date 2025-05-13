# P5 Web - Blogging Platform

P5 Web is a simple and modern blogging platform built with Deno and Fresh. It allows users to create, search, and view blog posts with a clean and responsive interface.

## Features

- **Create Posts**: Users can create new blog posts with a title, cover image, content, and author name.
- **Search Posts**: Search functionality to find posts by keywords.
- **View Posts**: Browse posts in a list or grid view.
- **Dynamic Routing**: View individual posts with dynamic routes.
- **API Integration**: Fetches data from a backend API for posts.

## Getting Started

### Prerequisites

Make sure to install Deno: https://deno.land/manual/getting_started/installation

### Usage

To start the project, run the following command:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Development

- Use `deno task check` to lint and check the code.
- Modify the routes and islands to customize the functionality.

### Deployment

This project is configured for deployment using Deno Deploy. Refer to the `.github/workflows/deploy.yml` file for the deployment pipeline.

### License

This project is licensed under the MIT License.
