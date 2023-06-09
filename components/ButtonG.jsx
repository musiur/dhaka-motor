import { Button, useTheme } from '@nextui-org/react';

const ButtonG = ({ text, color, func, flat }) => {
    const { theme } = useTheme();
    return func ? (
        <Button
            auto
            style={{
                background: theme.colors[color].value,
                // boxShadow: `0 3px 10px 0 ${theme.colors[color].value}`,
            }}
            onPress={func}
            flat={flat ? true : false}
        >
            {text}
        </Button>
    ) : (
        <Button
            auto
            style={{
                background: theme.colors[color].value,
                // boxShadow: `0 3px 10px 0 ${theme.colors[color].value}`,
            }}
            flat={flat ? true : false}
        >
            {text}
        </Button>
    );
};

export default ButtonG;
