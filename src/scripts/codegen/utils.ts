import _ from "lodash";
import pluralize from "pluralize";
import { Project, PropertySignature, SourceFile } from "ts-morph";
import upath from "upath";
import { Paths } from "./constants/paths";
import { HookAction } from "./enums/hook-action";
import { log } from "./log";

const getFromFunctionName = (property: PropertySignature): string =>
    `from${getTableName(property)}`;

const getInterfaceName = (property: PropertySignature): string =>
    _.capitalize(pluralize(property.getName(), 1));

const getInterfacePath = (property: PropertySignature): string =>
    upath.join(
        Paths.base,
        "interfaces",
        `${getInterfaceName(property).toLowerCase()}.ts`
    );

const getInterfaceImportPath = (property: PropertySignature): string =>
    removeExt(getInterfacePath(property).replace("src/", ""));

const getHookName = (
    property: PropertySignature,
    action: HookAction
): string => {
    const entityName =
        action === HookAction.LIST
            ? getTableName(property)
            : getInterfaceName(property);

    return `use${action}${entityName}`;
};

const getHookOptionsInterfaceName = (
    property: PropertySignature,
    action: HookAction
): string => {
    const hookName = getHookName(property, action).replace("use", "Use");
    return `${hookName}Options`;
};

const getRecordImportPath = (property: PropertySignature): string =>
    upath.join("models", removeExt(getRecordFileName(property)));

const getRecordName = (property: PropertySignature): string =>
    `${getInterfaceName(property)}Record`;

const getRecordFileName = (property: PropertySignature): string =>
    `${getInterfaceName(property).toLowerCase()}-record.ts`;

const getRecordSourceFile = (
    project: Project,
    property: PropertySignature
): SourceFile | undefined => {
    const sourceFile = project.getSourceFiles(
        `**/*/${getRecordFileName(property)}`
    )[0];
    if (sourceFile == null) {
        log.warn(
            `No record found for '${getInterfaceName(
                property
            )}', this hook will return raw objects.`
        );
    }

    return sourceFile;
};

const getTableName = (property: PropertySignature): string =>
    _.capitalize(property.getName());

const removeExt = (filename: string) => upath.removeExt(filename, ".ts");

const toKebabCase = (value: string) => {
    const hasOneCapitalLetter = value.match(/[A-Z]/g)?.length === 1;
    const firstLetterIsCapitalized = value[0].match(/[A-Z]/g) != null;
    if (hasOneCapitalLetter && firstLetterIsCapitalized) {
        return value.toLowerCase();
    }

    return value
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
        .toLowerCase();
};

export {
    getFromFunctionName,
    getInterfaceImportPath,
    getInterfaceName,
    getInterfacePath,
    getHookName,
    getHookOptionsInterfaceName,
    getRecordFileName,
    getRecordImportPath,
    getRecordName,
    getRecordSourceFile,
    getTableName,
    toKebabCase,
};
