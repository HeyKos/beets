import { Record as ImmutableRecord } from "immutable";
import { makeDefaultValues } from "utils/core-utils";
import { BaseRecord } from "models/base-record";
import { Project } from "generated/interfaces/project";
import { AuditableRecord } from "models/auditable-record";
import { AuditableDefaultValues } from "constants/auditable-default-values";

const defaultValues = makeDefaultValues<Project>({
    ...AuditableDefaultValues,
    name: "",
});

class ProjectRecord
    extends AuditableRecord(BaseRecord(ImmutableRecord(defaultValues)))
    implements Project
{
    constructor(values?: Partial<Project | ProjectRecord>) {
        values = values ?? defaultValues;

        if (values instanceof ProjectRecord) {
            values = values.toPOJO();
        }

        super(values);
    }
}

export { ProjectRecord };