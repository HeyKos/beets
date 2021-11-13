import { MenuItem } from "components/menu/menu-item";
import { Menu as EvergreenMenu, Pane } from "evergreen-ui";
import { PropsWithChildren } from "react";
import { useTheme } from "utils/hooks/use-theme";

interface MenuProps {}

const Menu: React.FC<PropsWithChildren<MenuProps>> & {
    Item: typeof MenuItem;
    Group: typeof EvergreenMenu.Group;
    Divider: typeof EvergreenMenu.Divider;
    Option: typeof EvergreenMenu.Option;
    OptionsGroup: typeof EvergreenMenu.OptionsGroup;
} = (props: PropsWithChildren<MenuProps>) => {
    const { children } = props;
    const theme = useTheme();

    return (
        <EvergreenMenu>
            <Pane background={theme.colors.gray100}>{children}</Pane>
        </EvergreenMenu>
    );
};

Menu.Item = MenuItem;
Menu.Group = EvergreenMenu.Group;
Menu.Divider = EvergreenMenu.Divider;
Menu.Option = EvergreenMenu.Option;
Menu.OptionsGroup = EvergreenMenu.OptionsGroup;

export { Menu };