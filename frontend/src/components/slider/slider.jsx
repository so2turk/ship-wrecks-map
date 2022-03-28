import { Box, Slider } from "@mui/material"
import './slider.css'

const DepthSlider = () => {

  return (
    <div className="slider">
      <Box sx={{ height: 700 }}>
        <Slider
          valueLabelDisplay="on" 
          value={[100, 1000]}
          min={0}
          max={2000}
          sx={{
            color: 'red',
            '& input[type="range"]': {
              WebkitAppearance: 'slider-vertical',
            },
          }}
          orientation="vertical"
        />
      </Box>
    </div>
  )

}

export default DepthSlider