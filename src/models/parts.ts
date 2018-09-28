

export class MyParts {
  sparePartId;//备件id
  unitName;//备件单位
  unitId;//备件单位id
  partName;//备件名称
  partNo;//备件型号
  userId;
  number:any;

  constructor(sparePartId,number?,
    unitName?,
    unitId?,
    partName?,
    userId?,
    partNo?
    ) {
    this.sparePartId = sparePartId;
    this.number = number;
    this.unitName = unitName;
    this.unitId = unitId;
    this.partName = partName;
    this.partNo = partNo;
    this.userId = userId;
    
  }
}
