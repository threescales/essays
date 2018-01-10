const size = require('lodash/size')
const map = require('lodash/map')
export function addBlockCommentToBody(commentId: Number, body: any, blockKey, blockText, offset: Number) {
    console.log(`添加block评论入参为：${commentId},${blockKey},${offset},${blockText},`)
    console.log(JSON.stringify(body))
    let entityMap = body.entityMap
    let blocks = body.blocks

    let newEntityKey = entityMap ? size(entityMap) : 0
    let newBlocks = map(blocks, ((block: any, index) => {
        let newBlock = block;
        if (blockKey == block.key) {
            let entityRanges = block.entityRanges
            if (entityRanges && entityRanges.length > 0) {
                let hasComment = false
                for (let i = 0; i < entityRanges.length; i++) {
                    let entityKey = entityRanges[i].key
                    let entity = entityMap[entityKey]

                    if (entity.type == 'COMMENT') {
                        entity.data.commentIds.push(commentId)
                        entityMap[entityKey] = entity
                        hasComment = true
                        break;
                    }
                }
                if (!hasComment) {
                    let entityRange = {
                        "offset": offset,
                        "length": blockText.length,
                        "key": newEntityKey
                    }
                    entityRanges.push(entityRange)

                    entityMap[newEntityKey] = {
                        "type": "draft-js-plugins-comment",
                        "mutability": "MUTABLE",
                        "data": {
                            "commentIds": [commentId]
                        }
                    }
                }
            } else {
                let entityRange = {
                    "offset": offset,
                    "length": blockText.length,
                    "key": newEntityKey
                }
                entityRanges = [entityRange]


                entityMap[newEntityKey] = {
                    "type": "draft-js-plugins-comment",
                    "mutability": "MUTABLE",
                    "data": {
                        "commentIds": [commentId]
                    }
                }
            }
            newBlock.entityRanges = entityRanges
        }
        return newBlock
    }))

    let newBody: any = {}
    newBody.blocks = newBlocks
    newBody.entityMap = entityMap
    console.log(JSON.stringify(newBody))
    return newBody
}

