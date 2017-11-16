import * as Koa from 'koa'
/**
 * Generate Sequlize queries from query url of koa request
 */
export class QueryGenerator {
  static MAX_SIZE = 50
  static DEFAULT_SIZE = 10
  static DEFAULT_ORDER = [['createdAt', 'DESC']]
  static DEFAULT_OFFSET = 0

  generate(context: Koa.Context) {
    let result = {
      limit: QueryGenerator.DEFAULT_SIZE,
      order: QueryGenerator.DEFAULT_ORDER,
      offset: QueryGenerator.DEFAULT_OFFSET
    }

    for (let name in context.query) {
      const method = this[`handle_${name}`]
      if (method) {
        const value = context.query[name]
        method(value, result)
      }
    }
    return result
  }


  private handle_size(value, result) {
    result.limit = value ?
      value > QueryGenerator.MAX_SIZE ? QueryGenerator.MAX_SIZE : value
      : QueryGenerator.DEFAULT_SIZE
  }

  private handle_offset(value, result) {
    result.offset = value || 0
  }

  /**
   * @param  {String} value  string like  'createdAt,DESC'  'updatedAt,DESC'
   * @param  {Object} result
   */
  private handle_order(value: string, result) {
    if (value) {
      const splited = value.split(',')
      const attr = splited[0]
      const direction = splited[1]
      if (attr && direction) {
        result.order = [
          [attr, direction]
        ]
      }
    }
  }
}

export default new QueryGenerator()