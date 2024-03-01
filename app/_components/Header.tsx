import { 
  Search, 
  SettingsOutlined, 
  PersonOutlineOutlined, 
  KeyboardArrowDown, 
  MenuOutlined,
  Home,
  SportsSoccerOutlined,
  StarBorderOutlined,
  ListAltOutlined,
  BarChartOutlined
} from '@mui/icons-material';

const Header = () => {
  return (
    <nav className="sticky top-[-60px]">
      <div className="flex items-center justify-between gap-4 px-5 py-3 bg-primary-500 border-b border-secondary-400/10">
        <div className="flex-1 font-semibold text-white-100 text-3xl flex items-center justify-start gap-3">
          <button className='p-1 h-9 flex items-center justify-center aspect-square rounded-full hover:bg-white-100/10'>
            <MenuOutlined /> 
          </button>
          <span>Score Plug</span>
        </div>
        <div className='overflow-clip flex-1 flex items-stretch justify-start gap-2 bg-white-100/5 border border-secondary-100/10 hover:border-secondary-100/50 rounded-md'>
          <label htmlFor="search" className="text-white-500 flex items-center justify-center pl-2">
            <Search />
          </label>
          <input 
            className="text-sm flex-1 bg-transparent border-none outline-none text-white-600 focus:text-white-200 h-[35px] pr-2" 
            type="text" 
            id="search" 
            placeholder="Barcelona v Chelsea" 
          />
        </div>
        <ul className="flex-1 flex items-center justify-end gap-4">
          <li className="aspect-square rounded-full border border-white-600 hover:bg-white-100/10 flex items-center justify-center p-1">
            <PersonOutlineOutlined />
          </li>
          <li className="rounded-2xl hover:bg-white-100/10 flex items-center justify-center py-1 px-2">
            <SettingsOutlined />
            <KeyboardArrowDown />
          </li>
        </ul>
      </div>
      <ul className='flex items-center justify-start gap-3 px-8 py-3 bg-primary-600'>
        <li className="h-[30px] flex items-center justify-center gap-1 px-3 rounded-[15px] bg-secondary-100 text-primary-600 font-bold">
          <Home />
          <span>Home</span>
        </li>
        <li className="h-[30px] flex items-center justify-center gap-1 px-3 rounded-[15px] bg-primary-100/10 text-secondary-600 font-semibold hover:bg-primary-200/20">
          <SportsSoccerOutlined />
          <span>Matches</span>
        </li>
        <li className="h-[30px] flex items-center justify-center gap-1 px-3 rounded-[15px] bg-primary-100/10 text-secondary-600 font-semibold hover:bg-primary-200/20">
          <ListAltOutlined />
          <span>Competitions</span>
        </li>
        <li className="h-[30px] flex items-center justify-center gap-1 px-3 rounded-[15px] bg-primary-100/10 text-secondary-600 font-semibold hover:bg-primary-200/20">
          <BarChartOutlined />
          <span>Predictions</span>
        </li>
        <li className="relative h-[30px] flex items-center justify-center gap-1 px-3 rounded-[15px] bg-primary-100/10 text-secondary-600 font-semibold hover:bg-primary-200/20">
          <StarBorderOutlined />
          <span>Favorites</span>
          <div className="absolute top-0 left-0 h-3 aspect-square rounded-full bg-highlight-400 border-2 border-primary-600"></div>
        </li>
      </ul>
    </nav>
  )
}

export default Header
