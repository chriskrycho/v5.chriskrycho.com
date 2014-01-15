Title: Hilarious code obfuscation technique
Date: 2012-11-07 16:03
Author: chriskrycho
Category: Posts
Tags: code, funny, programming, worst practices
Slug: hilarious-code-obfuscation-technique

Something you should never do, but which did provide some hilarity for
us today:

~~~~ {lang="cpp" line="1"}
if (idate < 65535)
  {
    CTime itime = CTime::GetCurrentTime();
      iyear = itime.GetYear();
        imonth = itime.GetMonth();
          idate = itime.GetDay();
            icurdate = (iyear - 2005)*512+12800 + (imonth*32 +1) + idate;
              if(icurdate > tdate)
                {
                  sprintf(str, "Key Expired");
                    MessageBoxEx(m_hWnd, str, "Error", MB_OK,LANG_ENGLISH);
                      exit(-1);
                    }
                  }
~~~~

The *whole* 1500-line module was written up that way. Why? We have no
idea. It's better now. Less funny, but better.
