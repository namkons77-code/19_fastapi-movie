from fastapi import APIRouter
from app.services.mock_data import MOCK_LIVE_CHANNELS

router = APIRouter(prefix="/live", tags=["Live TV Channels"])

@router.get("/channels")
async def get_live_channels():
    return MOCK_LIVE_CHANNELS
