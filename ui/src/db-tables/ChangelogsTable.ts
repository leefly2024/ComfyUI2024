import { getDB, saveDB } from "../Api";
import { v4 as uuidv4 } from "uuid";
import { getWorkspaceIndexDB, updateWorkspaceIndexDB } from "./IndexDBUtils";

export type Changelog = {
  id: string;
  workflowID: string;
  createTime: number;
  json: string;
};
type ChangelogRecord = {
  [id: string]: Changelog;
};
export class ChangelogsTable {
  static readonly TABLE_NAME = "changelogs";

  private constructor() {}

  static async load(): Promise<ChangelogsTable> {
    const instance = new ChangelogsTable();
    return instance;
  }

  public async listByWorkflowID(workflowID: string): Promise<Changelog[]> {
    const records = await this.getRecords();
    return Object.values(records)
      .filter((c) => c.workflowID === workflowID)
      .sort((a, b) => b.createTime - a.createTime);
  }
  public async getRecords(): Promise<ChangelogRecord> {
    let jsonStr = await getDB(ChangelogsTable.TABLE_NAME);
    let json = jsonStr != null ? JSON.parse(jsonStr) : null;
    if (json == null) {
      const comfyspace = (await getWorkspaceIndexDB()) ?? "{}";
      const comfyspaceData = JSON.parse(comfyspace);
      json = comfyspaceData[ChangelogsTable.TABLE_NAME];
    }
    return json ?? {};
  }
  public async get(id: string): Promise<Changelog | undefined> {
    const records = await this.getRecords();
    return records[id];
  }
  public async getLastestByWorkflowID(workflowID: string): Promise<Changelog> {
    const records = await this.getRecords();
    const all = Object.values(records)
      .filter((c) => c.workflowID === workflowID)
      .sort((a, b) => b.createTime - a.createTime);
    return all[0];
  }
  public async create(input: {
    json: string;
    workflowID: string;
  }): Promise<Changelog | null> {
    const latest = await this.getLastestByWorkflowID(input.workflowID);
    // only create when there is a change
    if (latest != null && latest.json === input.json) {
      return null;
    }
    const change: Changelog = {
      id: uuidv4(),
      json: input.json,
      workflowID: input.workflowID,
      createTime: Date.now(),
    };
    const records = await this.getRecords();
    records[change.id] = change;
    saveDB("changelogs", JSON.stringify(records));
    updateWorkspaceIndexDB();
    return change;
  }
}
