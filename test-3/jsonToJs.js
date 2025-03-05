const input = {
    "type": "当开始运行",
    "next": {
        "type": "永远循环",
        "statements": {
            "DO": {
                "type": "如果",
                "inputs": {
                    "IF0": {
                        "type": "判断角色碰撞",
                        "fields": {
                            "sprite": "自己",
                            "sprite1": "鼠标"
                        },
                        "is_output": true
                    }
                },
                "statements": {
                    "DO0": {
                        "type": "移动步数",
                        "inputs": {
                            "steps": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10
                                },
                                "is_output": true
                            }
                        }
                    },
                    "ELSE": {
                        "type": "移到位置",
                        "inputs": {
                            "x": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0
                                },
                                "is_output": true
                            },
                            "y": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": -100
                                },
                                "is_output": true
                            }
                        }
                    }
                }
            }
        }
    }
};

function jsonToJs(jsonNode, indent = 0) {
    const getIndent = () => '  '.repeat(indent);
    if (!jsonNode) return '';
    switch (jsonNode.type) {
        case '当开始运行':
            return `${getIndent()}当开始运行(() => {\n` +
                `${jsonToJs(jsonNode.next, indent + 1)}\n` +
                `${getIndent()}});`;

        case '永远循环':
            return `${getIndent()}永远循环(() => {\n` +
                `${jsonToJs(jsonNode.statements?.DO, indent + 1)}\n` +
                `${getIndent()}});`;

        case '如果':
            const condition = jsonToJs(jsonNode.inputs?.IF0, indent);
            const thenBlock = jsonToJs(jsonNode.statements?.DO0, indent + 1);
            const elseBlock = jsonToJs(jsonNode.statements?.ELSE, indent + 1);
            return `${getIndent()}if (${condition}) {\n` +
                `${thenBlock}\n` +
                `${getIndent()}} else {\n` +
                `${elseBlock}\n` +
                `${getIndent()}}`;

        case '判断角色碰撞':
            const args = [jsonNode.fields?.sprite, jsonNode.fields?.sprite1]
                .map(v => `"${v}"`).join(', ');
            return `判断角色碰撞(${args})`;

        case '移动步数':
            const steps = jsonToJs(jsonNode.inputs?.steps, indent);
            return `${getIndent()}移动步数(${steps});`;

        case '移到位置':
            const x = jsonToJs(jsonNode.inputs?.x, indent);
            const y = jsonToJs(jsonNode.inputs?.y, indent);
            return `${getIndent()}移到位置(${x}, ${y});`;

        case 'math_number':
            return jsonNode.fields?.NUM.toString();

        default:
            return '';
    }
}

console.log(jsonToJs(input));