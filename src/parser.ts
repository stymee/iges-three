// custom parser stuff

// main context tree type
export type Tree = {
	input: string; 
	pos: number
};

type Succeed<T> = {
    success: true;
    val: T;
    tree: Tree;
};

type Fail = {
    success: false;
    msg: string;
    tree: Tree;
};

type Result<T> = Succeed<T> | Fail;

type Parser<T> = (tree: Tree) => Result<T>;


const ok = <T>(tree: Tree, val: T): Succeed<T> => {
    return {success: true, val, tree};
};

const fail =(tree: Tree, msg: string): Fail => {
    return {success: false, msg, tree};
};

export const isNum = (check: string) => !isNaN(parseFloat(check));

export const digit = (): Parser<number> => {
    return tree => {
        const endPos = tree.pos + 1;
        const found = tree.input.substring(tree.pos, endPos);
        if (isNum(found)) {
            return ok({...tree, pos: endPos}, parseInt(found, 10));
        } else {
            return fail(tree, `expected a digit, found "${found}"`);
        }
    };
};

export const chr = (check: string): Parser<string> => {
    return tree => {
        const endPos = tree.pos + check.length;
		const found = tree.input.substring(tree.pos, endPos);
        if (found === check) {
            return ok({...tree, pos: endPos}, check);
        } else {
            return fail(tree, `expected "${check}", found "${found}"`);
        }
    };
};

export const any = <T>(parsers: Parser<T>[]): Parser<T> => {
    return tree => {
        let furthest: Result<T> | null = null;
        for (const parser of parsers) {
            const result = parser(tree);
            if (result.success) {
                return result;
            }
            if (!furthest || furthest.tree.pos < result.tree.pos) {
                furthest = result;
            }
        }
        return furthest;
    };
};


