export interface Project {
  id: number;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}