import React, { useState } from "react"
import IconButton from "./common/IconButton"
import EditIcon from "./icons/EditIcon"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"
import TrashIcon from "./icons/TrashIcon"

const testurl =
  "https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=577447615&zip=30301&referrer=%2Fcars-for-sale%2Fsearchresults.xhtml%3Fzip%3D30301%26city%3DAtlanta%26sortBy%3Drelevance%26incremental%3Dall%26state%3DGA%26firstRecord%3D0%26marketExtension%3Dinclude%26modelCodeList%3D4RUN%26relevanceConfig%3Ddefault%26makeCodeList%3DTOYOTA%26searchRadius%3D50%26isNewSearch%3Dfalse&numRecords=25&firstRecord=0&modelCodeList=4RUN&makeCodeList=TOYOTA&searchRadius=50&makeCode1=TOYOTA&modelCode1=4RUN&clickType=listing"

const Bookmark: React.FC = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <div
      className="h-12 border m-2 p-2 rounded shadow flex flex-col justify-between max-w-4xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex flex-row items-center">
        <p className="text-sm font-bold">Bookmark Title</p>
        {isHovering && (
          <div className="pl-4 flex flex-row justify-between items-center">
            <p className="max-w-lg truncate text-sm font-light">{testurl}</p>
            {/* <div className="flex flex-row">
              <IconButton>
                <TrashIcon fill="#666" />
              </IconButton>
              <IconButton>
                <EditIcon fill="#666" />
              </IconButton>
            </div> */}
          </div>
        )}
      </div>
      {/* <div>
        <div>
          <div className="flex flex-row items-center">
            <p className="text-sm font-bold leading-loose hover:text-blue-700">
              Bookmark Title
            </p>
            <div className="h-4 w-4">
              <ExternalLinkIcon fill="blue" />
            </div>
          </div>
          <p className="text-xs text-gray-700 hover:text-blue-700 truncate">
            https://bookmark-href.com/something/else
          </p>
        </div>
        <p className="text-sm mt-4">
          Bookmark Description, This is a short description of what the bookmark
          does
        </p>
      </div>
      {isHovering && (
        <div className="flex flex-row">
          <IconButton>
            <TrashIcon fill="#666" />
          </IconButton>
          <IconButton>
            <EditIcon fill="#666" />
          </IconButton>
        </div>
      )} */}
    </div>
  )
}
export default Bookmark
