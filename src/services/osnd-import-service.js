/*
###################################################################
Fitinsur Open Insurance - Copyright 2019-2023 - All Rights Reserved
###################################################################
*/

import React, { useContext, useEffect, useRef, useState } from 'react';

export default function useBackgroundOsndImportService() {


  useEffect(() => {
    setInterval(async () => {
      localStorage.setItem('teste', 1)
    }, 2000)
  }, [])
}