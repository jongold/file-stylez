import * as Figma from 'figma-js';
import { flatten } from 'ramda';

export const findTeamFiles = async (
  client: Figma.ClientInterface,
  teamId: string,
): Promise<ReadonlyArray<Figma.FileSummary>> => {
  const {
    data: { projects },
  } = await client.teamProjects(teamId);

  const projectIds = projects.map(project => project.id);

  const projectFiles = projectIds.map(id =>
    client.projectFiles(id).then(res => res.data.files),
  );

  const allFiles = await Promise.all(projectFiles);

  return allFiles.reduce((acc, files) => [...acc, ...files], []);
};
