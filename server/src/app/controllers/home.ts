import { getSource } from '../../utils/staticSource'
export async function home(ctx) {
    console.error(ctx)
  const path = getSource()
  await ctx.render('index', { path })
}
