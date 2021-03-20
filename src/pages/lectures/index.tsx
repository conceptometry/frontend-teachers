import Sidebar from '../../components/Sidebar';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import LecturesList from '../../components/lists/LecturesList';
import { IconButton, List } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
import DayTabs from '../../components/Lectures/dayTabs';
import React, { useEffect } from 'react';
import { parseCookies } from '../../helpers/parseCookies';

export const getServerSideProps = async (ctx) => {
  const page = ctx.query.page;
  const isLoggedIn: string | undefined | null = parseCookies(ctx.req).token;
  if (isLoggedIn === null || isLoggedIn === undefined || !isLoggedIn) {
    return { props: { data: false } };
  } else {
    const token: string = parseCookies(ctx.req).token;
    const url = `${process.env.API_URI}/lectures?page=${page || 1}&limit=30`;
    const options: {
      method: string;
      headers: { 'Content-Type': string; authorization: string };
    } = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(url, options);

    let data;
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      data = {
        success: false,
        message: message,
        status: res.status,
      };
    } else {
      data = await res.json();
    }

    return { props: { data } };
  }
};

const Lectures = ({ data }: { data: any }) => {
  const router = useRouter();
  useEffect(() => {
    if (!data || data === false) {
      router.push('/login');
    }
  }, []);
  const { page } = router.query;
  let weekday: String[] = [];
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  return (
    <>
      <Head>
        <title>Conceptometry | Lectures</title>
      </Head>
      <Sidebar>
        {data.success === true ? (
          <>
            <Link href='/lectures/add'>
              <div
                className='addLecture position-fixed'
                style={{ top: 68, right: 10 }}
              >
                <IconButton className='outline-none'>
                  <AddRounded className='outline-none' />
                </IconButton>
              </div>
            </Link>
            <h2 className='text-center my-2'>Lectures</h2>

            <DayTabs data={data} />

            <div className='d-flex mx-1'>
              {+page > 1 && (
                <Link href={`/lectures?page=${(+page || 1) - 1}`}>
                  <a
                    className='btn btn-light border border-1 border-primary bg-gradient mx-1'
                    style={{ width: '100%' }}
                  >
                    Previous Page
                  </a>
                </Link>
              )}
              {data.pages > (page || 1) && (
                <Link href={`/lectures?page=${(+page || 1) + 1}`}>
                  <a
                    className='btn btn-light border border-1 border-primary bg-gradient mx-1'
                    style={{ width: '100%' }}
                  >
                    Next Page
                  </a>
                </Link>
              )}
            </div>
            <div className='d-flex mx-1 mt-1'>
              <button
                type='button'
                className='btn btn-light bg-gradient border border-primary mx-1 w-100 shadow-sm'
              >
                Total Pages{' '}
                <span
                  className='badge bg-secondary'
                  style={{ fontWeight: 500 }}
                >
                  {data.pages || 0}
                </span>
              </button>
              <button
                type='button'
                className='btn btn-light bg-gradient border border-primary mx-1 w-100 shadow-sm'
              >
                Current Page{' '}
                <span
                  className='badge bg-secondary'
                  style={{ fontWeight: 500 }}
                >
                  {page || 1}
                </span>
              </button>
            </div>
          </>
        ) : (
          <p className='m-3'>{data.message}</p>
        )}
      </Sidebar>
    </>
  );
};

export default Lectures;
