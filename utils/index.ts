// Helper function to format date
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const getDateRange = (start: string, end: string): string => {
  const endDate = new Date(end);
  const now = new Date();
  const isPresent = endDate >= now;
  return `${formatDate(start)} - ${isPresent ? "Present" : formatDate(end)}`;
};

// Helper function to get technology icon
export const getTechIcon = (tech: string): string | null => {
  const techName = tech.toLowerCase().trim();

  const iconMap: { [key: string]: string } = {
    // Languages
    typescript: "typescript/typescript-original.svg",
    javascript: "javascript/javascript-original.svg",
    python: "python/python-original.svg",
    java: "java/java-original.svg",
    go: "go/go-original.svg",
    rust: "rust/rust-original.svg",
    cpp: "cplusplus/cplusplus-original.svg",
    "c++": "cplusplus/cplusplus-original.svg",

    // Frontend Frameworks
    react: "react/react-original.svg",
    "react.js": "react/react-original.svg",
    nextjs: "nextjs/nextjs-original.svg",
    "next.js": "nextjs/nextjs-original.svg",
    vue: "vuejs/vuejs-original.svg",
    "vue.js": "vuejs/vuejs-original.svg",
    angular: "angular/angular-original.svg",
    svelte: "svelte/svelte-original.svg",

    // Backend Frameworks
    nodejs: "nodejs/nodejs-original.svg",
    "node.js": "nodejs/nodejs-original.svg",
    express: "express/express-original.svg",
    "express.js": "express/express-original.svg",
    nestjs: "nestjs/nestjs-original.svg",
    django: "django/django-plain.svg",
    flask: "flask/flask-original.svg",
    fastapi: "fastapi/fastapi-original.svg",
    spring: "spring/spring-original.svg",

    // Databases
    postgresql: "postgresql/postgresql-original.svg",
    postgres: "postgresql/postgresql-original.svg",
    mongodb: "mongodb/mongodb-original.svg",
    mysql: "mysql/mysql-original.svg",
    redis: "redis/redis-original.svg",

    // Cloud & DevOps
    aws: "amazonwebservices/amazonwebservices-original-wordmark.svg",
    gcp: "googlecloud/googlecloud-original.svg",
    azure: "azure/azure-original.svg",
    docker: "docker/docker-original.svg",
    kubernetes: "kubernetes/kubernetes-original.svg",

    // Tools & Others
    git: "git/git-original.svg",
    github: "github/github-original.svg",
    gitlab: "gitlab/gitlab-original.svg",
    vscode: "vscode/vscode-original.svg",
    tailwindcss: "tailwindcss/tailwindcss-original.svg",
    tailwind: "tailwindcss/tailwindcss-original.svg",
    graphql: "graphql/graphql-plain.svg",
    firebase: "firebase/firebase-original.svg",
    prisma: "prisma/prisma-original.svg",
  };

  const iconPath = iconMap[techName];
  if (iconPath) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}`;
  }

  return null;
};
