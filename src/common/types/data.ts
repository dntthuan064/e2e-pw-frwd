export class ScenarioData {
  secretsData?: Record<string, any>;
  commonData?: Record<string, any>;
  tempData: Record<string, any>;

  constructor() {
    this.tempData = {};
  }

  setData(key: string, value: any) {
    this.tempData[key] = value;
  }

  getData(key: string): any {
    return this.tempData[key];
  }
}

export interface UserCredentials {
  email: string;
  password: string;
} 