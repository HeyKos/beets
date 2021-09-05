import { majorScale, minorScale, Paragraph, TextInput } from "evergreen-ui";
import React, { useCallback, useRef, useState } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { useOutsideClick, useKey } from "rooks";

interface EditableParagraphProps {
    onChange?: (newValue: string) => void;
    value: string;
}

const EditableParagraph: React.FC<EditableParagraphProps> = (
    props: EditableParagraphProps
) => {
    const { onChange, value } = props;
    const {
        value: isEditing,
        setFalse: setIsEditingFalse,
        setTrue: setIsEditingTrue,
    } = useBoolean(false);
    const [initialValue, setInitialValue] = useState(value);
    const textInputRef = useRef<HTMLInputElement>(null);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(event.target.value),
        [onChange]
    );

    const startEditing = useCallback(() => {
        setInitialValue(value);
        setIsEditingTrue();
    }, [setInitialValue, setIsEditingTrue, value]);

    const stopEditingOrDefault = useCallback(() => {
        if (value == null || value.trim().length === 0) {
            onChange?.(initialValue);
        }

        setIsEditingFalse();
    }, [initialValue, onChange, setIsEditingFalse, value]);

    useOutsideClick(textInputRef, stopEditingOrDefault);
    useKey(["Escape", "Enter"], stopEditingOrDefault);

    if (isEditing) {
        return (
            <TextInput
                marginBottom={majorScale(1)}
                onChange={handleChange}
                ref={textInputRef}
                value={value}
            />
        );
    }

    return (
        <Paragraph
            fontSize="small"
            onClick={startEditing}
            padding={minorScale(2)}>
            {value}
        </Paragraph>
    );
};

export { EditableParagraph };
