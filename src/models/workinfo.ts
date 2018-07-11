

export class WorkInfo {
  //我的工单
  myWork: string;
  //待审核工单
  toAudit: string;
  //待执行
  toPerform: string;
  //处理中
  inDoing: string;

  constructor(myWork: string, toAudit: string, toPerform: string, inDoing: string) {
    this.myWork = myWork;
    this.toAudit = toAudit;
    this.toPerform = toPerform;
    this.inDoing = inDoing;
  };
}
