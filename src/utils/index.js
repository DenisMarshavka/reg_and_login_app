export const checkObjectValid = (object = {}, existingParams = [], checkToAllFill = false) => {
    let isValid = object && typeof object === 'object'
        && Object.keys(object) && Object.keys(object).length;

    if (existingParams && Array.isArray(existingParams) && existingParams.length) {
        for (let key of existingParams) {
            if (isValid) {
                if (!checkToAllFill) {
                    isValid = key && !!(object[key])
                } else {
                    isValid = key && object[key]
                        && (
                            (typeof object[key] === 'string' && object[key] && object[key].trim())
                            || (typeof object[key] === 'number' && !Number.isNaN(+object[key]))
                            || (Array.isArray(object[key]) && object[key].length && object[key])
                            || (
                                typeof object[key] === 'object' && Object.keys(object[key])
                                && Object.keys(object[key]).length && object[key]
                            ) || (typeof object[key] === 'boolean')
                        )
                }
            } else break;
        }
    }

    return isValid;
}
