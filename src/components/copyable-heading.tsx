import { Flex } from "components/flex";
import { HelpResource } from "enums/help-resource";
import {
    Heading,
    HeadingProps,
    IconButton,
    LinkIcon,
    majorScale,
    TickIcon,
    toaster,
} from "evergreen-ui";
import { isEmpty, isString, kebabCase, omit } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { Sitemap } from "sitemap";
import { joinPaths } from "utils/route-utils";

interface CopyableHeadingProps extends HeadingProps {
    selectedTab?: HelpResource;
}

const CopyableHeading: React.FC<CopyableHeadingProps> = (
    props: CopyableHeadingProps
) => {
    const { children, selectedTab } = props;
    const [copied, setCopied] = useState<boolean>(false);

    const hash: string | undefined = useMemo(() => {
        let hash: string | undefined = isString(children)
            ? children
            : undefined;

        if (Array.isArray(children) && children.some(isString)) {
            hash = children.find(isString) as string;
        }

        return isEmpty(hash) ? undefined : kebabCase(hash);
    }, [children]);

    const handleClick = useCallback(() => {
        if (isEmpty(hash)) {
            toaster.danger("Failed to copy link!");
            return;
        }

        const { hash: existingHash, origin } = window.location;
        const currentPath =
            selectedTab != null
                ? joinPaths(origin, Sitemap.help.home, selectedTab)
                : window.location.toString().replace(existingHash, "");

        const link = `${currentPath}#${hash}`;
        setCopied(true);
        navigator.clipboard.writeText(link);
        setTimeout(() => setCopied(false), 1500);
    }, [hash, selectedTab]);

    return (
        <Flex.Row alignItems="center">
            <IconButton
                appearance="minimal"
                icon={copied ? TickIcon : LinkIcon}
                intent={copied ? "success" : "none"}
                marginRight={majorScale(1)}
                onClick={handleClick}
                size="small"
            />
            <Heading {...omit(props, "selectedTab")} />
        </Flex.Row>
    );
};

export { CopyableHeading };
